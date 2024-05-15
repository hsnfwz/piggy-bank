import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';

// images
import userIcon from '../assets/images/userIcon.svg';
import userAssistantIcon from '../assets/images/userAssistantIcon.svg';
import communityIcon from '../assets/images/communityIcon.svg';

function GroupMembersList({ auth }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const [fullName, setFullName] = useState('');

  const [groupMemberRecords, setGroupMemberRecords] = useState([]);

  const location = useLocation();

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    const userGroupId = location.pathname.split('/')[2];

    try {
      const endpoint = `http://localhost:5000/user_belongs_to_group?userGroupId=${userGroupId}`;

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      if (data.rows[0]) {
        const endpoint2 = data.rows[0].budgetMemberId
        ? `http://localhost:5000/budget_member/${data.rows[0].budgetMemberId}`
        : `http://localhost:5000/budget_assistant/${data.rows[0].budgetAssistantId}`

        const res2 = await fetch(endpoint2, options);
        const data2 = await res2.json();

        setGroupMemberRecords([data2.row]);
      } else {
        setGroupMemberRecords([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    
  }

  async function handleDelete() {
    const userGroupId = location.pathname.split('/')[2];

    try {
      const endpoint = `http://localhost:5000/user_belongs_to_group/${userGroupId}/${auth.user.saveinnUserId}`;

      const options = {
        method: 'DELETE',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }


  function handleClose() {
    setShowAddModal(false);
  }

  return (
    <Container fluid>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {communityIcon}
          width="320"
          height="250"
          alt="CommunityIcon"/>
        <h2 className='d-flex justify-content-center mt-4 mb-5'>Group Members</h2>
      </Row>
      <Container fluid className="d-flex justify-content-center">
          <Button type="button" className="saveinn-green-btn" onClick={() => setShowAddModal(true)}>Add Group Member</Button>
      </Container>
      <br />
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {groupMemberRecords.map((groupMemberRecord, index) => (
              <ListGroup.Item className='mx-5' key={index}>
                <Row className='d-flex align-items-center'>
                  <Col md="auto">
                    <img
                    src={groupMemberRecord.budgetMemberId ? userIcon : userAssistantIcon}
                    width="100"
                    height="100"
                    className="mx-2"
                    alt="Save Inn logo"
                    />
                  </Col>
                  {groupMemberRecord.budgetMemberId && (
                    <Col>
                      <Row>
                        <Col>
                          <p><strong>Name:</strong> { groupMemberRecord.firstName } { groupMemberRecord.lastName }</p>
                          <p><strong>Employment Position:</strong> { groupMemberRecord.employmentPosition || 'N/A' }</p>
                        </Col>
                      </Row>
                    </Col>
                  )}
                  {groupMemberRecord.budgetAssistantId && (
                    <Col>
                      <Row>
                        <Col>
                          <p><strong>Name:</strong> { groupMemberRecord.firstName } { groupMemberRecord.lastName }</p>
                          <p><strong>Area of Expertise:</strong> { groupMemberRecord.areaOfExpertise || 'N/A' }</p>
                          <p><strong>Years of Experience:</strong> { groupMemberRecord.yearsOfExperience || 'N/A' }</p>
                        </Col>
                      </Row>
                    </Col>
                  )}
                  <Col className='d-flex justify-content-end'>
                    <Button type="button" className="saveinn-red-btn" onClick={async () => await handleDelete()}>Leave</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Modal
            size="lg"
            centered
            show={showAddModal}
            onHide={() => handleClose()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Add Group Member
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" className="saveinn-green-btn" style={{ fontWeight: "normal" }} onClick={() => handleAdd()}>Add</Button>
              <Button type="button" className="saveinn-red-btn" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupMembersList;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar, Figure } from 'react-bootstrap';
import moment from 'moment';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';
import questionsIcon from '../assets/images/faqIcon.svg';

function QuestionsList({ auth }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [questionId, setQuestionId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [questionRecords, setQuestionRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:5000/ask_question';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setQuestionRecords(data.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const endpoint = 'http://localhost:5000/ask_question';

      const body = {
        saveinnUserId: auth.user.saveinnUserId,
        title,
        description,
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      handleClose();
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
      const endpoint = `http://localhost:5000/ask_question/${questionId}`;

      const body = {
        saveinnUserId: auth.user.saveinnUserId,
        title,
        description,
      }

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      handleClose();
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(_questionId) {
    try {
      const endpoint = `http://localhost:5000/ask_question/${_questionId}`;

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
    setQuestionId(0);
    setTitle('');
    setDescription('');
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid >
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src={questionsIcon}
          width="200"
          height="200"
          alt="Question Icon"/>
        <h2 className='d-flex justify-content-center mt-3 mb-5'>Questions</h2>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col className='d-flex justify-content-center'>
          <Button type="button" className="saveinn-green-btn" onClick={() => setShowAddModal(true)}>Ask Question</Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {questionRecords.map((questionRecord, index) => (
              <ListGroup.Item className='px-4 py-5 mx-5' key={index}>
                <Row className='d-flex justify-content-between flex-row'>
                  <Col>
                    <h4 className='font-weight-bold'>{ questionRecord.title }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p>{ moment(questionRecord.date).format('YYYY-MM-DD hh:mm A') }</p>
                  </Col>
                </Row>
                <p>{ questionRecord.description }</p>
                <Row>
                  {(questionRecord.saveinnUserId === auth.user.saveinnUserId) && (
                    <Col>
                      <Button type="button" className="saveinn-blue-btn" style={{ fontWeight: "normal" }} onClick={() => {
                        setQuestionId(questionRecord.askQuestionId);
                        setTitle(questionRecord.title);
                        setDescription(questionRecord.description);
                        setShowEditModal(true);
                      }}>Edit</Button>
                      <Button type="button" className="saveinn-red-btn" onClick={async () => await handleDelete(questionRecord.askQuestionId)}>Delete</Button>
                    </Col>
                  )}
                  <Col className='d-flex justify-content-end'>
                    <Link to={`/questions/${questionRecord.askQuestionId}`}>View</Link>
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
            show={showEditModal ? showEditModal : showAddModal}
            onHide={() => handleClose()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Ask Question
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" className="saveinn-green-btn" style={{ fontWeight: "normal" }} onClick={() => showEditModal ? handleEdit() : handleAdd()} disabled={!title || !description}>{ showEditModal ? 'Edit' : 'Ask'}</Button>
              <Button type="button" className="saveinn-red-btn" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default QuestionsList;

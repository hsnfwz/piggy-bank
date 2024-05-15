import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';
import moment from 'moment';

// images
import questionsIcon from '../assets/images/faqIcon.svg';

function AnswersList({ auth }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [answerId, setAnswerId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questionRecords, setQuestionRecords] = useState([]);

  const [answerRecords, setAnswerRecords] = useState([]);

  const location = useLocation();
  
  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    const askQuestionId = location.pathname.split('/')[2];

    try {
      const endpoint1 = `http://localhost:5000/ask_question/${askQuestionId}`;
      const endpoint2 = `http://localhost:5000/answer?askQuestionId=${askQuestionId}`;

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res1 = await fetch(endpoint1, options);
      const res2 = await fetch(endpoint2, options);

      const data1 = await res1.json();
      const data2 = await res2.json();

      setQuestionRecords(data1.rows);
      setAnswerRecords(data2.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    const askQuestionId = location.pathname.split('/')[2];

    try {
      const endpoint = 'http://localhost:5000/answer';

      const body = {
        saveinnUserId: auth.user.saveinnUserId,
        askQuestionId,
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
    const askQuestionId = location.pathname.split('/')[2];

    try {
      const endpoint = `http://localhost:5000/answer/${answerId}`;

      const body = {
        saveinnUserId: auth.user.saveinnUserId,
        askQuestionId,
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

  async function handleDelete(_answerId) {
    try {
      const endpoint = `http://localhost:5000/answer/${_answerId}`;

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
    setAnswerId(0);
    setTitle('');
    setDescription('');
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src={questionsIcon}
          width="200"
          height="200"
          alt="Question Icon"/>
        <h2 className='d-flex justify-content-center mt-3 mb-5'>Answers</h2>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col className='d-flex justify-content-center'>
          <Button type="button" className="saveinn-green-btn" onClick={() => setShowAddModal(true)}>Answer Question</Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {questionRecords.map((questionRecord, index) => (
              <ListGroup.Item className='px-4 py-5 mx-5' key={index} style={{ borderWidth: '3px', borderColor: '#758ECD' }}>
                <Row className='d-flex justify-content-between flex-row'>
                  <Col>
                    <h4 className='font-weight-bold'>{ questionRecord.title }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p>{ moment(questionRecord.date).format('YYYY-MM-DD hh:mm A') }</p>
                  </Col>
                </Row>
                <p>{ questionRecord.description }</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
            <ListGroup className='mx-5'>
              <>
                {answerRecords.map((answerRecord, index) => (
                  <ListGroup.Item className='px-4 py-3 mx-5' key={index}>
                    <Row className='d-flex justify-content-between flex-row'>
                      <Col>
                        <h4 className='font-weight-bold'>{ answerRecord.title }</h4>
                      </Col>
                      <Col className='d-flex justify-content-end'>
                        <p>{ moment(answerRecord.date).format('YYYY-MM-DD hh:mm A') }</p>
                      </Col>
                    </Row>
                    <p>{ answerRecord.description }</p>
                    {answerRecord.saveinnUserId === auth.user.saveinnUserId && (
                      <Row>
                        <Col>
                          <Button type="button" className="saveinn-blue-btn" style={{ fontWeight: "normal" }} onClick={() => {
                            setAnswerId(answerRecord.answerId);
                            setTitle(answerRecord.title);
                            setDescription(answerRecord.description);
                            setShowEditModal(true);
                          }}>Edit</Button>
                          <Button type="button" className="saveinn-red-btn" onClick={async () => await handleDelete(answerRecord.answerId)}>Delete</Button>
                        </Col>
                      </Row>
                    )}
                  </ListGroup.Item>
                ))}
              </>
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
                Answer Question
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
              <Button type="button" className="saveinn-green-btn" style={{ fontWeight: "normal" }} onClick={() => showEditModal ? handleEdit() : handleAdd()} disabled={!title || !description}>{ showEditModal ? 'Edit' : 'Answer'}</Button>
              <Button type="button" className="saveinn-red-btn" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default AnswersList;
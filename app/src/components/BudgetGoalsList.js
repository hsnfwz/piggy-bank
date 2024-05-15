import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';
import moment from 'moment';

// helpers
import { currencyFormat } from '../helpers';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';
import planIcon from '../assets/images/plan.svg';

function BudgetGoalsList({ auth }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [budgetGoalId, setBudgetGoalId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [amountSaved, setAmountSaved] = useState(0);

  const [budgetGoalRecords, setBudgetGoalRecords] = useState([]);

  const location = useLocation();

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    const planBudgetPlanId = location.pathname.split('/')[2];

    try {
      const endpoint = `http://localhost:5000/plan_has_goal?planBudgetPlanId=${planBudgetPlanId}`;

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setBudgetGoalRecords(data.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    const budgetPlanId = location.pathname.split('/')[2];

    try {
      const endpoint = 'http://localhost:5000/set_budget_goal';

      const body = {
        saveinnUserId: auth.user.saveinnUserId,
        name,
        description,
        startDate,
        endDate,
        amountSaved,
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

      const endpoint2 = 'http://localhost:5000/plan_has_goal';

      const body2 = {
        planBudgetPlanId: budgetPlanId,
        setBudgetGoalId: data.row.setBudgetGoalId,
      };

      const options2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body2),
        credentials: 'include',
      };

      const res2 = await fetch(endpoint2, options2);
      const data2 = await res2.json();

      handleClose();
      await handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
      const endpoint = `http://localhost:5000/set_budget_goal/${budgetGoalId}`;

      const body = {
        saveinnUserId: auth.user.saveinnUserId,
        name,
        description,
        startDate,
        endDate,
        amountSaved,
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

  async function handleDelete(_budgetGoalId) {
    try {
      const endpoint = `http://localhost:5000/set_budget_goal/${_budgetGoalId}`;

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
    setBudgetGoalId(0);
    setName('');
    setDescription('');
    setStartDate(undefined);
    setEndDate(undefined);
    setAmountSaved(0);
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {planIcon}
          width="250"
          height="250"
          alt="Plan Icon"/>
        <h2 className='d-flex justify-content-center mt-3 mb-5'>Budget Goals</h2>
      </Row>
      <Container fluid className="d-flex justify-content-center">
        <Button type="button" className="saveinn-green-btn" onClick={() => setShowAddModal(true)}>New Goal</Button>
      </Container>
      <br />
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {budgetGoalRecords.map((budgetGoalRecord, index) => (
              <ListGroup.Item className='px-4 py-3 mx-5' key={index}>
                <Row className='d-flex justify-content-between flex-row'>
                  <Col>
                    <h4 className='font-weight-bold'>{ budgetGoalRecord.name }</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <p className='me-2'>Start: { moment(budgetGoalRecord.startDate).format('YYYY-MM-DD') }</p>
                    <p>End: { moment(budgetGoalRecord.endDate).format('YYYY-MM-DD') }</p>
                  </Col>
                </Row>
                <p>{ budgetGoalRecord.description }</p>
                <p>Saved: { currencyFormat.format(budgetGoalRecord.amountSaved) }</p>
                <Button type="button" className="saveinn-blue-btn" style={{ fontWeight: "normal" }} onClick={() => {
                  setBudgetGoalId(budgetGoalRecord.setBudgetGoalId);
                  setName(budgetGoalRecord.name);
                  setDescription(budgetGoalRecord.description);
                  setStartDate(budgetGoalRecord.startDate);
                  setEndDate(budgetGoalRecord.endDate);
                  setAmountSaved(budgetGoalRecord.amountSaved);
                  setShowEditModal(true);
                }}>
                  Edit
                </Button>
                <Button type="button" className="saveinn-red-btn" onClick={async () => await handleDelete(budgetGoalRecord.setBudgetGoalId)}>Delete</Button>
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
                New Budget Goal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Start Date*</Form.Label>
                  <Form.Control type="date" onChange={(e) => setStartDate(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>End Date*</Form.Label>
                  <Form.Control type="date" onChange={(e) => setEndDate(e.target.value)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Amount Saved</Form.Label>
                  <Form.Control type="number" placeholder="Amount Saved" value={amountSaved} onChange={(e) => setAmountSaved(e.target.value)}/>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" className="saveinn-green-btn" style={{ fontWeight: "normal" }} onClick={() => showEditModal ? handleEdit() : handleAdd()} disabled={!name || !startDate || !endDate}>{ showEditModal ? 'Edit' : 'Add'}</Button>
              <Button type="button" className="saveinn-red-btn" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetGoalsList;
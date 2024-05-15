import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Navbar } from 'react-bootstrap';
import moment from 'moment';

// context
import { AuthContext } from '../context/AuthContext';

// images
import creditCardIconGreen from '../assets/images/creditCardIconGreen.svg';

// helpers
import { currencyFormat } from '../helpers';

function IncomeTransactionsList() {
  const auth = useContext(AuthContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [incomeId, setIncomeId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);

  const [sum, setSum] = useState(0);
  const [averageByCategory, setAverageByCategory] = useState([]);

  const [incomeRecords, setIncomeRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = `http://localhost:5000/earn_income?saveinnUserId=${auth.user.saveinnUserId}`;

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setIncomeRecords(data.rows);

      await Promise.all([handleSum(), handleAverageByCategory()]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const endpoint = 'http://localhost:5000/earn_income';

      const body = {
        saveinnUserId: auth.user.saveinnUserId,
        title,
        description,
        category,
        amount,
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
      const endpoint = `http://localhost:5000/earn_income/${incomeId}`;

      const body = {
        saveinnUserId: auth.user.saveinnUserId,
        title,
        description,
        category,
        amount,
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

  async function handleDelete(_incomeId) {
    try {
      const endpoint = `http://localhost:5000/earn_income/${_incomeId}`;

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

  async function handleSum() {
    try {
      const endpoint = `http://localhost:5000/earn_income/sum?saveinnUserId=${auth.user.saveinnUserId}`;

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setSum(data.row.sum);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAverageByCategory() {
    try {
      const endpoint = `http://localhost:5000/earn_income/average_by_category?saveinnUserId=${auth.user.saveinnUserId}`;

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setAverageByCategory(data.rows);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    setIncomeId(0);
    setTitle('');
    setDescription('');
    setCategory('');
    setAmount(0);
    setShowAddModal(false);
    setShowEditModal(false);
  }

  return (
    <Container fluid>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src={creditCardIconGreen}
          width="200"
          height="200"
          alt="Credit Card Icon"/>
        <h2 className='d-flex justify-content-center mt-3 mb-5'>Income Transactions</h2>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Button type="button" className="saveinn-green-btn" onClick={() => setShowAddModal(true)}>Add Income Transaction</Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h4 className="d-flex justify-content-center">Total: { currencyFormat.format(sum) }</h4>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Category</td>
                <td>Amount</td>
                <td>Date</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {incomeRecords.map((incomeRecord, index) => (
                <tr key={index}>
                  <td>{ incomeRecord.title }</td>
                  <td>{ incomeRecord.description }</td>
                  <td>{ incomeRecord.category }</td>
                  <td>{ currencyFormat.format(incomeRecord.amount) }</td>
                  <td>{ moment(incomeRecord.date).format('YYYY-MM-DD') }</td>
                  <td>
                    <Button type="button" className="saveinn-blue-btn" style={{ fontWeight: "normal" }} onClick={() => {
                      setIncomeId(incomeRecord.earnIncomeId);
                      setTitle(incomeRecord.title);
                      setDescription(incomeRecord.description);
                      setCategory(incomeRecord.category);
                      setAmount(incomeRecord.amount);
                      setShowEditModal(true);
                    }}>
                      Edit
                    </Button>
                    <Button type="button" className="saveinn-red-btn" onClick={async () => await handleDelete(incomeRecord.earnIncomeId)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Category</td>
                <td>Average Income</td>
              </tr>
            </thead>
            <tbody>
              {averageByCategory.map((avgByCategory, index) => (
                <tr key={index}>
                  <td>{ avgByCategory.category }</td>
                  <td>{ currencyFormat.format(avgByCategory.avg) }</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
                New Income Transaction
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

                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" step="any" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" className="saveinn-green-btn" style={{ fontWeight: "normal" }} onClick={() => showEditModal ? handleEdit() : handleAdd()}>{ showEditModal ? 'Edit' : 'Add'}</Button>
              <Button type="button" className="saveinn-red-btn" onClick={() => handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default IncomeTransactionsList;
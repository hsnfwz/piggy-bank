import { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Form, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';
import userIcon from '../assets/images/userAssistantIcon.svg';
import membersIcon from '../assets/images/assistantIcon.svg'

function BudgetAssistantsList({ auth }) {
  const [budgetAssistantRecords, setBudgetAssistantRecords] = useState([]);

  useEffect(() => {
    (async function() {
      await handleRefresh();
    }());
  }, []);

  async function handleRefresh() {
    try {
      const endpoint = 'http://localhost:5000/budget_assistant';

      const options = {
        method: 'GET',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setBudgetAssistantRecords(data.rows);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container fluid>
      <Row className='px-5 mt-3 d-flex justify-content-center'>
        <img 
          src= {membersIcon}
          width="200"
          height="200"
          alt="Assistants Icon"/>
        <h2 className='d-flex justify-content-center mt-3 mb-5'>Assistants</h2>
      </Row>
      <Row>
        <Col>
          <ListGroup className='mx-5'>
            {budgetAssistantRecords.map((budgetAssistantRecord, index) => (
              <ListGroup.Item className='mx-5' key={index}>
                <Row className='d-flex align-items-center'>
                  <Col md="auto">
                    <img
                    src={userIcon}
                    width="100"
                    height="100"
                    className="mx-2"
                    alt="Save Inn logo"
                    />
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <p><strong>Name:</strong> { budgetAssistantRecord.firstName } { budgetAssistantRecord.lastName }</p>
                        <p><strong>Area of Expertise:</strong> { budgetAssistantRecord.areaOfExpertise || 'N/A' }</p>
                        <p><strong>Years of Experience:</strong> { budgetAssistantRecord.yearsOfExperience || 'N/A' }</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetAssistantsList;
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import BudgetAssistantsList from '../components/BudgetAssistantsList';
import LoadingInfo from '../components/LoadingInfo';

function BudgetAssistantsLayout() {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth.isAuthenticating && (
        <LoadingInfo />
      )}

      {!auth.isAuthenticating && auth.user && (
        <Container fluid>
          <Row>
            <Col>
              <BudgetAssistantsList auth={auth} />
            </Col>
          </Row>
        </Container>
      )}

      {!auth.isAuthenticating && !auth.user && (
        <Navigate to="/log-in" />
      )}
    </>
  );
}

export default BudgetAssistantsLayout;
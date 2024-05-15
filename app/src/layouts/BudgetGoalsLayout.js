import { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import BudgetGoalsList from '../components/BudgetGoalsList';
import LoadingInfo from '../components/LoadingInfo';

function BudgetGoalsLayout() {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth.isAuthenticating && (
        <LoadingInfo />
      )}

      {!auth.isAuthenticating && auth.user && (
        <>
          <Container fluid>
            <Row className="px-4">
              <Col>
                <BudgetGoalsList auth={auth} />
              </Col>
            </Row>
          </Container>
        </>
      )}

      {!auth.isAuthenticating && !auth.user && (
        <Navigate to="/log-in" />
      )}
    </>
  );
}

export default BudgetGoalsLayout;

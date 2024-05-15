import { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import IncomeTransactionsList from '../components/IncomeTransactionsList';
import ExpenseTransactionsList from '../components/ExpenseTransactionsList';
import LoadingInfo from '../components/LoadingInfo';

function DashboardLayout() {
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
                <IncomeTransactionsList auth={auth} />
              </Col>
              <Col>
                <ExpenseTransactionsList auth={auth} />
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

export default DashboardLayout;

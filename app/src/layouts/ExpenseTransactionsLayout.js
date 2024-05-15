import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import ExpenseTransactionsList from '../components/ExpenseTransactionsList';
import LoadingInfo from '../components/LoadingInfo';

function ExpenseTransactionsLayout() {
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
              <ExpenseTransactionsList auth={auth} />
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

export default ExpenseTransactionsLayout;

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import AnswersList from '../components/AnswersList';
import LoadingInfo from '../components/LoadingInfo';

function AnswersLayout() {
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
              <AnswersList auth={auth} />
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

export default AnswersLayout;

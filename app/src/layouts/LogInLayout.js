import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import LogInInfo from '../components/LogInInfo';
import LoadingInfo from '../components/LoadingInfo';

function LogInLayout() {
    const auth = useContext(AuthContext);

    return(
        <>
            {auth.isAuthenticating && (
                <LoadingInfo />
            )}

            {!auth.isAuthenticating && !auth.user && (
                <Container fluid>
                    <Row>
                        <Col>
                            <LogInInfo auth={auth} />
                        </Col>
                    </Row>
                </Container>
            )}

            {!auth.isAuthenticating && auth.user && (
                <Navigate to="/dashboard" />
            )}
        </>
    )
}

export default LogInLayout;

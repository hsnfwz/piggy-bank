import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import SignUpInfo from '../components/SignUpInfo';
import LoadingInfo from '../components/LoadingInfo';

function RegistrationLayout() {
    const auth = useContext(AuthContext);

    return (
        <>
            {auth.isAuthenticating && (
                <LoadingInfo />
            )}

            {!auth.isAuthenticating && !auth.user && (
                <Container fluid>
                    <Row>
                        <Col>
                            <SignUpInfo auth={auth} />
                        </Col>
                    </Row>
                </Container>
            )}

            {!auth.isAuthenticating && auth.user && (
                <Navigate to="/dashboard" />
            )}
        </>
    );
}

export default RegistrationLayout;

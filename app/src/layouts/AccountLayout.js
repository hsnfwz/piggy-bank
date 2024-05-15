import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// context
import { AuthContext } from '../context/AuthContext';

// components
import BudgetMemberAccountInfo from '../components/BudgetMemberAccountInfo';
import BudgetAssistantAccountInfo from '../components/BudgetAssistantAccountInfo';
import LoadingInfo from '../components/LoadingInfo';

function AccountLayout() {
    const auth = useContext(AuthContext);

    return(
        <>
            {auth.isAuthenticating && (
                <LoadingInfo />
            )}

            {!auth.isAuthenticating && auth.user && auth.user.budgetMemberId && (
                <>
                    <Container fluid>
                        <Col>
                            <Row>
                                <BudgetMemberAccountInfo auth={auth} />
                            </Row>
                        </Col>
                    </Container>
                </>
            )}

            {!auth.isAuthenticating && auth.user && auth.user.budgetAssistantId && (
                <>
                    <Container fluid>
                        <Col>
                            <Row>
                                <BudgetAssistantAccountInfo auth={auth} />
                            </Row>
                        </Col>
                    </Container>
                </>
            )}

            {!auth.isAuthenticating && !auth.user && (
                <Navigate to="/log-in" />
            )}
        </>
    )
}

export default AccountLayout;

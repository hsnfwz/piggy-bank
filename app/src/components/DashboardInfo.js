import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from 'react-bootstrap';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';

function DashboardInfo({ auth }) {
    let navigate = useNavigate();

    async function handleSignOut() {
        await auth.signOut();
        if (!auth.user) navigate("/", { replace: false });
    }

    return(
        <Container fluid>
            <Navbar className="p-4 mb-2">
                <Container className="d-flex justify-content-start">
                <Navbar.Brand className="brand-logo d-flex align-items-center" style={{ color: '#63D3A9' }} href="/dashboard">
                    <img 
                    src= {saveInnLogo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top mx-2"
                    alt="Save Inn logo"/>
                    My Dashboard</Navbar.Brand>
                <Nav xs={6}>
                    <Nav.Link href="/account">Account</Nav.Link>
                    <Nav.Link href="/income-transactions">Income Transactions</Nav.Link>
                    <Nav.Link href="/expense-transactions">Expense Transactions</Nav.Link>
                    <Nav.Link href="/questions">Questions</Nav.Link>
                    <Nav.Link href="/budget-members">Budget Members</Nav.Link>
                    <Nav.Link href="/budget-assistants">Budget Assistants</Nav.Link>
                    <Nav.Link href="/groups">Groups</Nav.Link>
                    <Nav.Link href="/budget-plans">Budget Plans</Nav.Link>
                </Nav>
                </Container>
                <Container className="d-flex justify-content-end">
                    <Button type="button" className="saveinn-green-btn" onClick={async () => await handleSignOut()}>Log Out</Button>
                </Container>
            </Navbar>
        </Container>
    )
}

export default DashboardInfo
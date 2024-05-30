import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, InputGroup, Navbar, Nav } from 'react-bootstrap';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';
import piggyBank from '../assets/images/manPiggyBank.svg';
import backgroundImage from '../assets/images/landingBackground.png';

function HomeInfo() {

    let navigate = useNavigate();

    return (
        <Container fluid className="px-5" style={{height: "100vh", backgroundImage : `url(${backgroundImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition:"center"}}>
            <Row className="d-flex align-items-center px-2 gap-4" style={{ height: "60vh"}}>
                <Col className="px-5">
                    <Row className="pb-2">
                        <h1 style={{fontWeight: "bold"}}>Welcome to PiggySave!</h1>
                    </Row>
                    <Row className="py-2">
                        <h4 className="text-muted">The ultimate community budget management platform.</h4>
                    </Row>
                    <Row className="pt-2">
                        <Button type="button" className="saveinn-green-btn" onClick={() => navigate("sign-up", { replace: false })}>Sign Up</Button>
                    </Row>
                </Col>
                <Col className="d-flex justify-content-center">
                    <img 
                    src= {piggyBank}
                    alt="Man riding piggy bank"
                    width="400"
                    height="320"
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default HomeInfo;
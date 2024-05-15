import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Navbar, Button, Form } from 'react-bootstrap';

// images
import saveInnLogo from '../assets/images/saveInnLogo.svg';

function SignUpInfo({ auth }) {
    const [isAssistant, setIsAssistant] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [employmentPosition, setEmploymentPosition] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState(0);
    const [areaOfExpertise, setAreaOfExpertise] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const timeId = setTimeout(() => {
            setErrorMessage('');
        }, 3000);

        return () => {
            clearTimeout(timeId);
        }
    }, [errorMessage]);

    let navigate = useNavigate();

    const radioChange = (e) => e.target.value == "yes" ? setIsAssistant(true) : setIsAssistant(false);

    async function handleSignUp() {
        try {
            const endpoint = isAssistant ? 'http://localhost:5000/budget_assistant' : 'http://localhost:5000/budget_member';
      
            const body = isAssistant
                ? {
                    firstName,
                    lastName,
                    postalCode,
                    yearsOfExperience,
                    areaOfExpertise,
                }
                : {
                    firstName,
                    lastName,
                    postalCode,
                    employmentPosition,
                };
      
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
              credentials: 'include',
            };
      
            const res = await fetch(endpoint, options);
            const data = await res.json();

            const endpoint2 = 'http://localhost:5000/saveinn_user';

            const body2 = {
                username,
                email,
                password,
                budgetMemberId: data.row.budgetMemberId || null,
                budgetAssistantId: data.row.budgetAssistantId || null,
            };

            const options2 = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body2),
                credentials: 'include',
              };

              const res2 = await fetch(endpoint2, options2);
              const data2 = await res2.json();

              if (data2.message !== 'Success') {
                setErrorMessage(data2.message);
              } else {
                navigate('/log-in', { replace: false });
              }
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <Container fluid className="d-flex flex-column justify-content-center align-items-center">
            <h4>Sign Up</h4>                
            <br />
            <div className="d-flex justify-content-center">{ errorMessage }</div>
            <br />
            <Form>
                <Form.Group className="my-2">
                    <Form.Label>Username*</Form.Label>
                    <Form.Control type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>
                <div className="row">
                    <Form.Group className="my-2 col">
                        <Form.Label>First Name*</Form.Label>
                        <Form.Control type="text" value={firstName} placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="my-2 col">
                        <Form.Label>Last Name*</Form.Label>
                        <Form.Control type="text" value={lastName} placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
                    </Form.Group>
                </div>
                <Form.Group className="my-2">
                    <Form.Label>Postal Code*</Form.Label>
                    <Form.Control type="text" value={postalCode} placeholder="Postal Code" onChange={(e)=>setPostalCode(e.target.value)}/>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>Are you a financial advisor?</Form.Label>
                    <div>
                        <Form.Check inline label="Yes" value="yes" name="assistant" type="radio" id="inline-radio-1" checked={isAssistant} onChange={radioChange}/>
                        <Form.Check inline label="No" value="no" name="assistant" type="radio" id="inline-radio-2" checked={!isAssistant} onChange={radioChange}/>
                    </div>
                </Form.Group>
                {isAssistant && (
                    <div>
                        <Form.Group className="my-2 col">
                            <Form.Label>Area of Expertise</Form.Label>
                            <Form.Control type="text" value={areaOfExpertise} placeholder="Area of Expertise" onChange={(e)=>setAreaOfExpertise(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="my-2 col">
                            <Form.Label>Years of Experience</Form.Label>
                            <Form.Control type="number" value={yearsOfExperience} placeholder="Enter a number" min="0" onChange={(e)=>setYearsOfExperience(e.target.value)}/>
                        </Form.Group>
                    </div>
                )}
                {!isAssistant && (
                    <Form.Group className="my-2">
                        <Form.Label>Employment Position</Form.Label>
                        <Form.Control type="text" value={employmentPosition} placeholder="Employment" onChange={(e)=>setEmploymentPosition(e.target.value)}/>
                    </Form.Group>
                )}
                <br />
                <Button type="button" className="saveinn-green-btn" disabled={!firstName || !lastName || !username || !email || !password || !postalCode} onClick={async () => await handleSignUp()}>Sign Up</Button>
            </Form>
        </Container>
    )
}

export default SignUpInfo
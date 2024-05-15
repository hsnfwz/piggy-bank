import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

function ErrorLayout() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>404 Not Found</h1>
          <Link to="/">Home</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorLayout;
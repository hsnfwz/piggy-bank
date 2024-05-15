import { Container, Row, Col, Spinner } from 'react-bootstrap';

function LoadingInfo() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="center-all">
            <Spinner animation="border" role="status" variant="primary" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoadingInfo;

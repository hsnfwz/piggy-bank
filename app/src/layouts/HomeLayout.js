import { Container, Row, Col } from "react-bootstrap";
import HomeInfo from '../components/HomeInfo';

function HomeLayout(){
  return(
    <Container fluid>
      <Col>
        <Row>
          <HomeInfo />
        </Row>
      </Col>
    </Container>
  )
}
export default HomeLayout;
import { Col, Container, Row } from "react-bootstrap";

const ArticleSample = ({content, title}) => {
  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col xs={4}>
          {/* Take in image url and add it to styles */}
            <div class="contentImg"></div>
          </Col>
          <Col style={{padding:"5% 0"}}>
            <Row>
              <Col><h2>{title}</h2></Col>
            </Row>
            <Row>
              <Col>{content}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticleSample;

import { Col, Container, Row } from "react-bootstrap";

const ArticleSample = () => {
  return (
    <>
      <Container style={{ marginBottom:"20px"}}>
        <Row>
          <Col xs={4}>
          {/* Take in image url and add it to styles */}
            <div class="contentImg"></div>
          </Col>
          <Col style={{padding:"5% 0"}}>
            <Row>
              <Col>Shognjgfmnhgfdmghjm ghjm ghjmgj mjm gjm gjfmt descriptasfdsgfsdg sdfg dfg dfgh ion about something that is very importnat</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticleSample;

import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ArticleSample = ({ content, desc, title }) => {
  const navigate = useNavigate();
  const navi = () => {
    navigate("article", {
      state: { content: content, desc: desc, title: title },
    });
  };
  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col xs={4}>
            {/* Take in image url and add it to styles */}
            <div class="contentImg"></div>
          </Col>
          <Col style={{ padding: "5% 0" }}>
            <Row>
              <Col>
                <h2>{title}</h2>
              </Col>
            </Row>
            <Row>
              <Col>{desc}</Col>
            </Row>
          </Col>
          <Col style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}} xs={1}>
            <Button
              onClick={() => {
                navi();
              }}
            ><ChevronRightIcon/></Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticleSample;

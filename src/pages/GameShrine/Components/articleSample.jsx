import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ArticleSample = ({ content, desc, title, image }) => {
  const navigate = useNavigate();
  const navi = () => {
    navigate("article", {
      state: { content: content, desc: desc, title: title },
    });
  };
  const url =
    `url("https://gameshrinebucket02330-staging.s3.us-west-1.amazonaws.com/public/undefined?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5GLG47G5M2A2VQTA%2F20220923%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20220923T000559Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJIMEYCIQDonJIGQ9aTBsFHtTAqEEMhpGk%2FTjWQriFT9Rc61DI2MgIhAJJvSCXopJmCv5P7KyTQ39d%2B3MvGAdoMOoE6YO%2BUcvObKs0ECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMOTA2OTkwNzc4ODEwIgyKVbNRVjLrDblSuB4qoQT%2BlSvRwD%2FxLWrEbbdg6w3dpw9l0H9SbZTHYy80oUkl57%2F6zQJdbN5KPNuVzvRLu%2FSJR1h5UKzIsBj2vcEJqYJ4k%2FwHnrT30y6BfTt7Wv%2FXAgweiGzT3UL%2FxF5fBBAddY9HmCrp3%2FYCuAkdR8%2FDWieyid4cNPBJR0g5o3v7RW5ThyzeYo4aPA1Z1EIhj%2FSCwBncbrXuWp92z%2ByjOTXBpcbyiyJjSqPnna%2BmszUv9h5AFOdKCznku1oushHwxjqfgIylfIHgt57YuSZnqwo9v7DtI2ZCRvy6YQGFTPWgAoYPY4VLogmVH1wtEiwaPK3nHCxVNXXAIWLpQsaGHLQEdFZxnLLcSJ8ZcXdPC5C4gtAgzGQriVZDSvO6FzDbCNmz0sCk91tWYRybYK9UArGe1%2FAGCCuapMINheYiGhF%2BrMcUc40BArn23exp4G1W4cYQjCWrhJTLsuFuI5LrHY9HVq%2B30vmRsEuuE5e5JBD4g3pWBIfZ94Wh%2B%2BP5qDKB0y%2FW63uAMn3MLrwmddUTsngdLNUfquWY%2BgVtVmKcim%2BM%2BvGJyK%2FGKls47oOVo5FVYO5siLg72LijipHl8En8mV1CvgVkVeYoo5ZooD2BVrWTONcFGU3gfDZANHg9l83%2FNQSntieq2kPM4rcR3Gm6MfzQgdzyZOmduf0L6feGUKoN7qxAMxVrpGkNIrSzoe7DEdUR6gPKwWk8FMHfxlXR9wQhYbKucTDl8LOZBjqEAhZdbFITp%2BpVP%2FtjB%2F04QmKccPL72wW8HbGPZJJSCU5DX0F6kAYxCq%2BTCEwZiNcmcymep%2FHrqkL1Rcbqr%2Bguxn8aO5XdJ2sM5c96Etf2y%2BU%2FQG17pCOmwy8MEyAnsTUpLGs6wIiiiad2MniPbbzK0f6mW8Yc%2FyE%2BEEjEmS2JZOxPE8ynJ95B5FPjrpbGXfCkmZWolSHD%2BTQg1nUlDPGO4WLsZeh2qXwXXJk5bJRqO6aHxQyLMj%2B1KnnILYX1%2Ft4UXZ8fOJ5mHoBSDcb0givW%2BxJ5HZ0aQmwr%2BROpVqEg%2B2lfzeA84Qh4SRCKVWLe2P%2BXKtiYh8b0UizcNgKI7Kitl9IZZVpy&X-Amz-Signature=13428e8a714065ee40b0f3a230a2987465a4564a7bf2b91d55641de7dcda1e94&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2FWindows%2FNT_10.0%20lang%2Fjs%20md%2Fbrowser%2FChrome_105.0.0.0%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.7.2_js&x-id=GetObject")`;
  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col xs={4}>
            {/* Take in image url and add it to styles */}
            {image && (
              <div class="contentImg" style={{ backgroundImage: {url} }}></div>
            )}
            {!image && <div class="contentImg"></div>}
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
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            xs={1}
          >
            <Button
              onClick={() => {
                navi();
              }}
            >
              <ChevronRightIcon />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticleSample;

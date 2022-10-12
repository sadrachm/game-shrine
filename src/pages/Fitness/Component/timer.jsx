

const Timer = ({exercise, reps, setSet, set, setRep}) => {
    return <div
    className="mt-4"
    style={{
      height: "60vh",
      maxHeight: "500px",
      maxWidth: "100%",
      aspectRatio: "1",
      margin: "auto",
      backgroundColor: "blue",
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    }}
    onClick={() => {
      console.log("Start Timer");
      exercise.reps.push(reps);
      setSet(set + 1);
      setRep(0);
    }}
  >
    <h1 style={{ textAlign: "center", color: "white" }}>Start Rest</h1>
  </div>
}

export default Timer;
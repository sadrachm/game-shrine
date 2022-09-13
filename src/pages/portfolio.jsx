import React from "react";
import { motion } from "framer-motion";
import Project from "../components/project";

const Portfolio = () => {
  return (
    <>
      <div className="container ">
        <motion.p
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 3 }}
          className="display-1 title "
        >
          Hello
        </motion.p>
        <div className="row homeContent">
          <motion.div
            animate={{ y: [500, 0] }}
            transition={{ type: "spring", duration: 2.2 }}
            className="col left"
          >
            <img
              className="img-fluid image rounded-circle"
              src={process.env.PUBLIC_URL + "/img/me.jpg"}
            />
          </motion.div>
          <motion.div
            animate={{ y: [500, 0] }}
            transition={{ type: "spring", duration: 3 }}
            className="col right"
          >
            <p className="h2 text-right">I'm Sadrach Martinez</p>
            <p className="h3 text-right"> an aspiring software engineer </p>
          </motion.div>
        </div>
      </div>
      <div id="projects">
        <h1 className="display-1 mb-5" style={{ textAlign: "center" }}>
          <u>Projects</u>
        </h1>
        <div className="container">
          <div className="row subtitle ">
            <Project
              url="http://sadrachreviews.herokuapp.com/"
              name="Sadrach Reviews"
              imageName="review"
            />
            <Project
              url="https://vast-lake-43602.herokuapp.com/"
              name="Todo List"
              imageName="list"
            />
          </div>
          <div className="row subtitle ">
            <Project
              url="https://vast-lake-43602.herokuapp.com/"
              name="CoachLink"
              imageName="coachlink"
            />
          </div>
        </div>
      </div>

      <div style={{ height: "100px" }}></div>
      <div id="aboutMe">
        <motion.h1
          className="display-1 title"
          whileInView={{ opacity: [0, 0.9] }}
          transition={{ duration: 5 }}
        >
          Who is Sadrach?
        </motion.h1>
        <div 
            style={{  textAlign:"center" }}>
          <p
            className="display-5 mt-3"
            style={{fontSize:"1rem",width: "70%", margin:'auto'}}
          >
            I just recently graduated from UCI as a Software Engineer
          </p>
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Portfolio;

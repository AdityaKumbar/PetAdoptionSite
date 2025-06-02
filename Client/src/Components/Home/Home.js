import React from "react";
import HomeLandingContainer from "./HomeLandingContainer";

const Home = (props) => {
  return (
    <>
      <HomeLandingContainer description={props.description} />
    </>
  );
};

export default Home;

import React, { useEffect } from "react";
import "./App.css";
import paintParticles from "./paintParticles";

function App() {
  const [physics, setPhysics] = React.useState({
    gravity: 100,
    wind: 1,
    yVelocity: 120,
    xVelocity: 90,
    opacity: 960,
    weight: 3,
    loopTime: 300,
    red: 55,
    blue: 100,
    green: 100,
    isDots: 0,
    tunnel: 1,
    vortex: 5,
    density: 5,
  });

  useEffect(() => {
    paintParticles(physics);
  }, []);

  return <div className="App"></div>;
}

export default App;

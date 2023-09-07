import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Addnote from "./components/Addnote";
import Editnote from "./components/Editnote";
import Notestate from "./contexts/notestate";
import ParticlesBackground from "./particlesComponent/particlesBackground";

function App() {
  return (
    <Notestate>
    <Router>
      <div className='center'>
      <ParticlesBackground/>
      <Routes>
        <Route excat path="/" element={<Login/>}/>
        <Route excat path="/Signup" element={<Signup/>}/>
        <Route excat path="/Home" element={<Home/>}/>
        <Route excat path="/Addnote" element={<Addnote/>}/>
        <Route excat path="/Editnote" element={<Editnote/>}/>
      </Routes>
      </div>
    </Router>
    </Notestate>
  );
}

export default App;

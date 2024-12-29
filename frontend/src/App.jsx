import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NoteState from './context/notes/notestate';
import Notes from './components/Notes';


function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes/>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
        <Footer/>
    </Router>
    </NoteState>
    </>
  );
}

export default App;

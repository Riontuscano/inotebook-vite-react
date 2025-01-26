import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NoteState from './context/notes/notestate';
import AuthState from './context/auth/authstate';
import Notes from './components/Notes';
import Addnote from './components/Addnote';
import Archivenote from './components/Archivenote';
import Authway from './pages/Authway';
import Alert  from './components/Alert';


const App = () => {
  const [alert,setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      tp:type
    });
  }
   setTimeout(() => {
    setAlert(null);
  },3000);

  return (
    <>
    <AuthState>
    <NoteState>
    <Router>
      <Navbar showAlert={showAlert} />
      <Alert alert={alert}/>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes showAlert={showAlert}/>} />
          <Route path="/notes/create" element={<Addnote showAlert={showAlert}/>} />
          <Route path="/notes/archive" element={<Archivenote showAlert={showAlert}/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/Authway' element={<Authway showAlert={showAlert}/>}/>
        </Routes>
      </div>
        <Footer/>
    </Router>
    </NoteState>
    </AuthState>
   
    </>
  );
}

export default App;

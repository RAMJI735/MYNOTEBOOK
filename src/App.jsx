import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Notes from "./components/Notes";
import About from "./components/About";
import Contact from "./components/Contact";
import CreateNote from "./components/CreateNote";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./contextapi/NoteState";

function App() {
  return (
    <Router>
      <NoteState>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Footer />
      </NoteState>
    </Router>
  );
}

export default App;

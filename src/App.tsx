//import { ThemeProvider } from "./contexts/ThemeContext";
import MenuSideBar from "./components/MenuSideBar";
//import Sidebar from './components/Sidebar';
//import Carousel from './components/Carousel';
//import Footer from './components/Footer';
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MenuSideBar />} />
          <Route path="/Detalhado/:matricula" element={<MenuSideBar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

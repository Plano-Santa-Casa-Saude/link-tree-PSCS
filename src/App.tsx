//import { ThemeProvider } from "./contexts/ThemeContext";
import MenuSideBar from "./components/MenuSideBar";
import DetalheBeneficiario from "./pages/Detalhado";
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
          <Route path="/Detalhado" element={<DetalheBeneficiario />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

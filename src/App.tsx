import MenuSideBar from "./components/MenuSideBar";
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

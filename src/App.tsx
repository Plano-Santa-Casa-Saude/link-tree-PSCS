import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <Carousel />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

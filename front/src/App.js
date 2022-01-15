import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
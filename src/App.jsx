import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarBackground from "./components/StarBackground";
import LoadingPage from "./pages/LoadingPage";
import InputPage from './pages/InputPage.jsx';
import ListPage from './pages/ListPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<InputPage />} />
            <Route path="/list" element={<ListPage />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
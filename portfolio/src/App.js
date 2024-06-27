import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { handleScroll } from './Components/ScrollAnimations';
import About from './Pages/About';

function App() {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Home />
      <About/>
    </div>
  );
}

export default App;

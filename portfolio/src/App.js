import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { handleScroll } from './Components/ScrollAnimations';
import About from './Pages/About';
import Timeline from './Pages/Timeline';
import Technologies from './Pages/Technologies';
import Certificates from './Pages/Certificates';

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
      <Timeline/> 
      <Technologies/>
      <Certificates/>
    </div>
  );
}

export default App;

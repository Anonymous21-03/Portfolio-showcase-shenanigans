import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { handleScroll } from './Components/ScrollAnimations';
import About from './Pages/About';
import Timeline from './Pages/Timeline';
import Technologies from './Pages/Technologies';
import Certificates from './Pages/Certificates';
import Music from './Pages/Music';
import Contact from './Pages/Contact';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
      {/* <Music/> */}
      <Contact/>
    </div>
  );
}

export default App;

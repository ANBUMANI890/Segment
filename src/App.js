import React, { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa";
import "./app.scss";
import SegmentPopup from './components/Segment';
const App = () => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='header'>
      < FaAngleLeft className='arrow' />
      <h4>View Audience</h4>
      <button  onClick={() => setIsOpen(true)}>
        Save Segment
      </button>
      {isOpen && 
      <SegmentPopup/>
      }
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';

const Scale = ({ currentTab }) => {
  const [scaleGradient, setScaleGradient] = useState('');

  useEffect(() => {
    let newScaleGradient = '';

    if (currentTab === 'min temp') {
      newScaleGradient = 'linear-gradient(to bottom, #C2FCF8, #88D8DA, #41ADC5, #1692B6)';
    } else if (currentTab === 'max temp') {
      newScaleGradient = 'linear-gradient(to bottom, #FFFFAD, #FFCB58, #F68F50, #E0603F)';
    } else if (currentTab === 'PRCP') {
      newScaleGradient = 'linear-gradient(to bottom, #E5FAC0, #B4E197, #83BD75, #4E944F)';
    } else if (currentTab === 'snowfall') {
      newScaleGradient = 'linear-gradient(to bottom, #F0E3FF, #D5B7F7, #916DD5, #6235AA)';
    }

    setScaleGradient(newScaleGradient);
  }, [currentTab]);

  return (
    <div style={{ marginRight: '20px',  marginTop: '50px'  }}>
      <h2 style={{ fontSize: '12px', marginTop: '50px' }}>Scale</h2>
      <div style={{ background: scaleGradient, width: '25px', height: '250px', borderRadius: '20px'}} />
    </div>
  );
};

export default Scale;
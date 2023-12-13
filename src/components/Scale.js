import React, { useEffect, useState } from 'react';

const Scale = ({ currentTab }) => {
  const [scaleGradient, setScaleGradient] = useState('');
  const [keyValues, setKeyValues] = useState([]);

  useEffect(() => {
    let newScaleGradient = '';
    let newKeyValues = [];

    if (currentTab === 'min temp') {
      newScaleGradient = 'linear-gradient(to bottom, #C2FCF8, #88D8DA, #41ADC5, #1692B6)';
      newKeyValues = ['0', '25', '50', '100', 'Daily Avg (C)'];
    } else if (currentTab === 'max temp') {
      newScaleGradient = 'linear-gradient(to bottom, #FFFFAD, #FFCB58, #F68F50, #E0603F)';
      newKeyValues = ['0', '25', '50', '100', 'Daily Avg (C)'];
    } else if (currentTab === 'PRCP') {
      newScaleGradient = 'linear-gradient(to bottom, #E5FAC0, #B4E197, #83BD75, #4E944F)';
      newKeyValues = ['0', '25', '50', '100', 'Daily Avg (mm)'];
    } else if (currentTab === 'snowfall') {
      newScaleGradient = 'linear-gradient(to bottom, #F0E3FF, #D5B7F7, #916DD5, #6235AA)';
      newKeyValues = ['0', '25', '50', '100', 'Daily Avg (mm)'];
    }

    setScaleGradient(newScaleGradient);
    setKeyValues(newKeyValues);
  }, [currentTab]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginRight: '10px', marginTop: '10px' }}>
    <h2 style={{ fontSize: '12px' }}>key</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {keyValues.map((value, index) => (
          <div key={index} style={{ fontSize: '10px', marginBottom: '63px' , marginRight: '5px' }}>{value}</div>
        ))}
      </div>
      <div style={{ marginLeft: '0px', background: scaleGradient, width: '30px', height: '250px', borderRadius: '10px' }} />
    </div>
  );
};

export default Scale;
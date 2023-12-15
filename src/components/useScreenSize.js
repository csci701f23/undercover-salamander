import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth : 0;
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
import React, { useState } from 'react';
import ControlBar from '@/components/ControlBar';
import Blob from '@/components/blob';
import Background from '@/components/background';
import "@/app/globals.css"; 

const HomePage = () => {
  const [blobColor, setBlobColor] = useState('#00ff00');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const [blobSize, setBlobSize] = useState(1); // Tamaño base inicial
  const [blobAnimation, setBlobAnimation] = useState('none');
  const [animationIntensity, setAnimationIntensity] = useState(1);
  
  const [gradientColors, setGradientColors] = useState({ color1: '#ff0000', color2: '#0000ff' });
  const [useGradient, setUseGradient] = useState(false);

  const handleBlobAnimation = (animation: string, intensity: number) => {
    setBlobAnimation(animation);
    setAnimationIntensity(intensity);
  };

  return (
    <Background backgroundColor={backgroundColor}>
      <ControlBar
        setBlobColor={setBlobColor}
        setBackgroundColor={setBackgroundColor}
        setBlobSize={setBlobSize}
        setBlobAnimation={handleBlobAnimation}
        setGradientColors={setGradientColors}
        setUseGradient={setUseGradient}
      />

      <Blob
        color={blobColor}
        gradientColors={gradientColors}
        useGradient={useGradient}
        size={blobSize}  // Asegúrate de que el tamaño se pase correctamente
        animation={blobAnimation}
        intensity={animationIntensity}
      />
    </Background>
  );
};

export default HomePage;

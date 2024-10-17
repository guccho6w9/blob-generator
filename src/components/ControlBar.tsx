import React from 'react';
import "@/app/globals.css"; // Importa los estilos globales

interface ControlBarProps {
  setBlobColor: (color: string) => void;
  setGradientColors: (colors: { color1: string; color2: string }) => void;
  setUseGradient: (useGradient: boolean) => void;
  setBlobSize: (size: number) => void;
  setBackgroundColor: (color: string) => void;
  setBlobAnimation: (animation: string, intensity: number) => void; // Cambiar aquí
}

const ControlBar: React.FC<ControlBarProps> = ({
  setBlobColor,
  setGradientColors,
  setUseGradient,
  setBlobSize,
  setBackgroundColor,
  setBlobAnimation,
}) => {
  const [background, setBackground] = React.useState('bg-white');
  const [useGradient, setGradientFlag] = React.useState(false);
  const [color, setColor] = React.useState('#00ff00');
  const [gradient, setGradient] = React.useState({ color1: '#ff0000', color2: '#0000ff' });
  const [animation, setAnimation] = React.useState('none');
  const [intensity, setIntensity] = React.useState(1);

  return (
    <div className="fixed top-0 right-0 h-full bg-gray-800 p-6 shadow-lg z-10 flex flex-col space-y-6">
      {/* Opciones de fondo */}
      <select
        value={background}
        onChange={(e) => {
          const newColor = e.target.value;
          setBackground(newColor);
          setBackgroundColor(newColor);
        }}
        className="bg-gray-700 text-white rounded-lg w-full"
      >
        <option value="bg-white">Fondo Blanco</option>
        <option value="bg-black">Fondo Negro</option>
      </select>

      {/* Control para color o degradado */}
      <label className="text-white">
        ¿Usar degradado?
        <input
          type="checkbox"
          checked={useGradient}
          onChange={(e) => {
            setGradientFlag(e.target.checked);
            setUseGradient(e.target.checked);
          }}
        />
      </label>

      {!useGradient ? (
        <label className="text-white">
          Color del Blob:
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              setBlobColor(e.target.value);
            }}
          />
        </label>
      ) : (
        <>
          <label className="text-white">
            Color 1:
            <input
              type="color"
              value={gradient.color1}
              onChange={(e) => {
                setGradient({ ...gradient, color1: e.target.value });
                setGradientColors({ ...gradient, color1: e.target.value });
              }}
            />
          </label>
          <label className="text-white">
            Color 2:
            <input
              type="color"
              value={gradient.color2}
              onChange={(e) => {
                setGradient({ ...gradient, color2: e.target.value });
                setGradientColors({ ...gradient, color2: e.target.value });
              }}
            />
          </label>
        </>
      )}

      {/* Control de tamaño */}
      <label className="text-white">
        Tamaño del Blob:
        <input
          type="range"
          min="0.3"
          max="5"
          step="0.1"
          onChange={(e) => {
            const newSize = parseFloat(e.target.value);
            setBlobSize(newSize); // Llama a la función pasada como prop
          }}
        />
      </label>

      {/* Animaciones */}
      <select
        value={animation}
        onChange={(e) => {
          const selectedAnimation = e.target.value;
          setAnimation(selectedAnimation);
          setBlobAnimation(selectedAnimation, intensity); // Cambiar aquí
        }}
        className="bg-gray-700 text-white rounded-lg w-full"
      >
        <option value="none">Sin animación</option>
        <option value="breathing">Respiración</option>
      </select>

      {animation === 'breathing' && (
        <label className="text-white">
          Intensidad de la respiración:
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={intensity}
            onChange={(e) => {
              const newIntensity = parseFloat(e.target.value);
              setIntensity(newIntensity);
              setBlobAnimation(animation, newIntensity); // Cambiar aquí
            }}
          />
        </label>
      )}
    </div>
  );
};

export default ControlBar;

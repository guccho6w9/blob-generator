// src/components/Background.tsx
import { ReactNode } from 'react';
import "@/app/globals.css";

interface BackgroundProps {
  backgroundColor: string;
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ backgroundColor, children }) => {
  return (
    <div className={`${backgroundColor} h-screen w-full flex items-center justify-center relative`}>
      {children}
    </div>
  );
};

export default Background;

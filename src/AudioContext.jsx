import { createContext, useRef, useState } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  return (
    <AudioContext.Provider value={{ audioRef, activeId, setActiveId }}>
      <audio ref={audioRef} style={{ display: "none" }} /> {/* ✅ هون */}
      {children}
    </AudioContext.Provider>
  );
};
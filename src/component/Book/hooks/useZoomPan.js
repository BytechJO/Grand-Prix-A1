import { useState, useRef } from "react";

export default function useZoomPan() {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const startPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (zoom === 1) return;
    setIsDragging(true);

    startPosition.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setOffset({
      x: e.clientX - startPosition.current.x,
      y: e.clientY - startPosition.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return {
    zoom,
    setZoom,
    offset,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetZoom,
  };
}

export default function PageSingle({ zoom, offset, isDragging, children }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-2xl border flex items-center justify-center overflow-hidden"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
        transformOrigin: "center top",
        cursor: zoom === 1 ? "default" : isDragging ? "grabbing" : "grab",
      }}
    >
      {children}
    </div>
  );
}

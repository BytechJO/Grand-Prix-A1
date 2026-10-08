export default function PageSpread({
  zoom,
  offset,
  isDragging,
  left,
  right,
  renderPage,
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-2xl border grid grid-cols-2 overflow-hidden"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
        transformOrigin: "center top",
        cursor: zoom === 1 ? "default" : isDragging ? "grabbing" : "grab",
      }}
    >
      <div className="border-r flex items-center justify-center">
        {renderPage(left)}
      </div>

      <div className="border-l flex items-center justify-center">
        {renderPage(right)}
      </div>
    </div>
  );
}

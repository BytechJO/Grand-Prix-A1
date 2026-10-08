export default function PageMobile({ zoom, page, renderPage }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-2xl border flex items-center justify-center overflow-hidden"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: "center top",
      }}
    >
      {renderPage(page)}
    </div>
  );
}

export default function RightSidebar({ isOpen, close, menu }) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-[99998]" onClick={close} />}

      <div
        className={`fixed right-0 bottom-0 w-64 h-full bg-white shadow-xl rounded-tl-2xl 
        transition-transform duration-300 z-[9999999999999]
        ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="p-4 border-b flex justify-between">
          <h2 className="text-xl text-[#430f68] font-semibold">Icon Key</h2>
          <button onClick={close}>✕</button>
        </div>

        <ul className="p-3 space-y-3">
          {menu.map((item) => (
            <li
              key={item.key}
              className="flex items-center gap-3 p-3 bg-purple-100 rounded-lg hover:bg-purple-300 cursor-pointer"
            >
              <img src={item.icon} className="h-12" style={{height:"35px",width:"35px"}} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

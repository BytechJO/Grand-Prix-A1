
export default function TopNavbar({
  activeTab,
  setActiveTab,
  logo,
  menuIcon,
  tabs,
  mobileTabsOpen,
  setMobileTabsOpen,
  isMobile,
}) {
 
  return (
    <nav className="w-full bg-white border-b shadow px-2 py-1 flex items-center justify-between relative">
      {/* LEFT */}
      <div className="flex items-center gap-10">
        <img src={logo} alt="logo" style={{ height: 40, width: 100 }} />

        {!isMobile && (
          <div className="hidden lg:flex items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1 rounded-xl border text-[15px] font-medium 
                ${
                  activeTab === tab.id
                    ? "border-[#430f68] text-[#430f68] bg-[#f6f0ff]"
                    : "border-[#b99cfa] text-[#430f68] hover:bg-purple-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="hidden lg:block text-[#430f68]">Teacher Edition</span>

        {isMobile && (
          <svg
            width="30"
            height="30"
            viewBox="0 0 90 90"
            onClick={() => setMobileTabsOpen(!mobileTabsOpen)}
            className="text-white p-0.5 rounded-lg shadow hover:bg-[#bc90ff] transition"
          >
            <image href={menuIcon} x="0" y="0" width="90" height="90" />
          </svg>
        )}
      </div>
    
      {/* 🌟 MOBILE TABS MENU — INSIDE NAVBAR NOW */}
      {isMobile && mobileTabsOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-b px-4 py-3 z-[99999]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileTabsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg mb-1 
                ${
                  activeTab === tab.id
                    ? "bg-[#f6f0ff] text-[#430f68]"
                    : "text-[#430f68] hover:bg-purple-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
          
        </div>
      )}
    </nav>
  );
}

import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function LeftSidebar({ isOpen, close, units, goToPage, book }) {
  const [openUnit, setOpenUnit] = useState(null);

  const toggleUnit = (unitId) => {
    setOpenUnit(openUnit === unitId ? null : unitId);
  };

  return (
    <>
      <div
        className={`fixed left-0 bottom-0 w-70 h-full bg-white shadow-xl 
  rounded-tr-2xl transition-transform duration-300 z-[99999]
  flex flex-col
  ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl text-[#430f68] font-semibold">
            Table of Contents
          </h2>
          <button onClick={close} className="text-2xl">
            ✕
          </button>
        </div>
        {book && (
          <div
            className={`bookInfo-div  ${
              book.title === "Right 1 Grammar Poster" ? "grammar-info" : ""
            } text-center mb-4`}
          >
            {book.cover && (
              <img
                src={book.cover}
                className="w-28 mx-auto rounded shadow"
                style={{ height: "118px", width: "auto" }}
              />
            )}

            <div className="mt-2 text-center">
              <h3 className="text-lg font-semibold text-[#430f68] text-center">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500">{book.pages} pages</p>
            </div>

            <div className="border-b border-gray-200 my-3"></div>
          </div>
        )}

        {/* CONTENT WITH SCROLL */}
        <div className="h-[calc(100%-70px)] overflow-y-auto px-2 py-0">
          {/* TITLE */}
          {/* <h3 className="text-lg font-semibold text-[#430f68] mt-4 mb-2">
            Units 📘
          </h3> */}

          {/* UNITS LIST */}
          <ul className="space-y-1">
            {units.map((u) => (
              <li
                key={u.id}
                className="border-b border-gray-300 last:border-none"
              >
                {/* UNIT BUTTON */}
                <div
                  onClick={() => toggleUnit(u.id)}
                  className="flex justify-between items-center py-3 px-2 cursor-pointer select-none"
                >
                  <span className="text-gray-700 font-medium">{u.label}</span>

                  {openUnit === u.id ? (
                    <IoChevronUp size={20} className="text-blue-500" />
                  ) : (
                    <IoChevronDown size={20} className="text-gray-500" />
                  )}
                </div>

                {/* DROPDOWN PAGES */}
                {openUnit === u.id && (
                  <ul className="ml-4 mb-2 space-y-1">
                    {Array.from({ length: u.pages }).map((_, i) => {
                      const pageNumber = u.start + i;

                      return (
                        <li
                          key={pageNumber}
                          className="py-1 px-2 text-gray-600 hover:text-blue-600 cursor-pointer transition"
                          onClick={() => {
                            goToPage(pageNumber);
                            close();
                          }}
                        >
                          Page {pageNumber}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div onClick={close} className="fixed inset-0 bg-black/40 z-[99998]" />
      )}
    </>
  );
}

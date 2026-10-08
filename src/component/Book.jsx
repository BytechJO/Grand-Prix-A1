import { useState, useEffect, useRef } from "react";

// === LAYOUT ===
import TopNavbar from "./Book/Navbar/TopNavbar";
import BottomBar from "./Book/Navbar/BottomBar";
import LeftSidebar from "./Book/Sidebars/LeftSidebar";
import RightSidebar from "./Book/Sidebars/RightSidebar";
//=== cover img ===
import workbookCover from "../assets/U1 WB/U1/Pages from cover right W.B New Int copy.pdf.png";
import stbookCover from "../assets/unit1/imgs/Pages from cover right SbEd copy.pdf.png";
import teacherBookCover from "../assets/Right TB/Right International TB G1_Page_001.png";
import fcBookCover from "../assets/Right 1 FC/img/right_New_Page_01.png";
import posterBookCover from "../assets/Right Grammar Poster/img/R1 Grammar poster_Page_01.png";
// === VIEWERS ===
import FlashCardViewer from "./FlashCardPages/FlashCardPages";
import PosterViewer from "./PosterGrammerPages/PosterGrammerPages";

// === POPUP ===
import Popup from "./Popup/Popup";
import LessonNavigator from "./StudentPages/LessonNavigator";
import teacherPdf from "../assets/Right TB G1.pdf";

// === ASSETS ===
import logo from "../assets/unit1/imgs/Page 01/PMAAlogo.svg";
import menu from "../assets/unit1/imgs/Page 01/menu.svg";
import next from "../assets/unit1/imgs/Page 01/next btn.svg";
import back from "../assets/unit1/imgs/Page 01/back btn.svg";
import home from "../assets/unit1/imgs/Page 01/home.svg";
import fullScreen from "../assets/unit1/imgs/Page 01/fullscreen.svg";
import zoomIn from "../assets/unit1/imgs/Page 01/zoom in.svg";
import zoomOut from "../assets/unit1/imgs/Page 01/zoom out.svg";
import onePage from "../assets/unit1/imgs/Page 01/one page.svg";
import openBook from "../assets/unit1/imgs/Page 01/open-book.svg";
import { FaKey } from "react-icons/fa";
import audioBtn from "../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../assets/unit1/imgs/Right Video Button.svg";
// === PAGES DATA ===
import {
  studentPages,
  workbookPages,
  teacherPages,
  flashPages,
  posterPages,
} from "./BookData";
import WorkBookNavigator from "./WorkBookPages/WorkBookNavigator";
import { postersVocabPages } from "./BookData/postersVocabPages";
import PosterVocabNavigator from "./PostersVocabPages/PosterVocabNavigator";
import TeacherBook from "./TeacherBookPages/TeacherBook";

export default function Book() {
  // ===========================================================
  //                 📌 STATE
  // ===========================================================
  const [pageIndex, setPageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "student";
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const touchStart = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState("spread");

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [leftBarOpen, setLeftBarOpen] = useState(false);
  const [rightBarOpen, setRightBarOpen] = useState(false);

  //------------------ swipe function -----------------------------

  // Popup
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [mobileTabsOpen, setMobileTabsOpen] = useState(false);

  // ===========================================================
  //                 📌 PAGE LIST SELECTOR
  // ===========================================================
  const pages = {
    student: studentPages(openPopup, goToUnit),
    work: workbookPages(openPopup, goToUnit),
    teacher: teacherPages.map((t) => <TeacherBook teacher={t} />),
    flash: flashPages,
    poster: posterPages.map((p) => (
      <PosterViewer poster={p} openPopup={openPopup} />
    )),
    posterVocab: postersVocabPages(openPopup, goToUnit),
  }[activeTab];

  // ===========================================================
  //                 📌 POPUP HANDLERS
  // ===========================================================
  function openPopup(type, data) {
    setPopupContent({ type, data, tab: activeTab });
    setPopupOpen(true);
  }
  function closePopup() {
    setPopupOpen(false);
  }

  // ===========================================================
  //                 📌 RESIZE LISTENER
  // ===========================================================
  useEffect(() => {
    const resize = () => {
      const mobile = window.innerWidth <= 1200;
      setIsMobile(mobile);

      if (mobile) {
        setViewMode("single"); // 🔥 إجبار الموبايل على single mode
      }
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    setPageIndex(0);
    setOffset({ x: 0, y: 0 });
    setZoom(1);
    localStorage.setItem("activeTab", activeTab);
    localStorage.setItem("pageIndex", pageIndex);
    if (
      activeTab === "poster" ||
      activeTab === "flash" ||
      activeTab === "posterVocab"
    ) {
      setViewMode("single"); // بوستر = صفحة واحدة دائمًا
    } else {
      if (!isMobile) {
        setViewMode("spread"); // لو الشاشة كبيرة → رجّع صفحتين
      } else {
        setViewMode("single"); // لو شاشة صغيرة → صفحة واحدة دائمًا
      }
    }
  }, [activeTab]);
  useEffect(() => {
    if (viewMode === "spread" && !isMobile) {
      const currentPageNumber = pageIndex + 1;

      // لو فردية → رجّعها للي قبلها
      if (currentPageNumber % 2 === 1 && currentPageNumber !== 1) {
        setPageIndex(pageIndex - 1);
      }
    }
  }, [viewMode]);

  // ===========================================================
  //                 📌 PAGE NAVIGATION
  // ===========================================================
  function goToUnit(index) {
    setPageIndex(index - 1);
    // ===========================
    // ❌ التحقق من إدخال غير صحيح
    // ===========================
    if (isNaN(index) || index < 1 || index > pages.length) {
      // رجّعه للفهرس (الصفحة الثانية لأن الأولى سينجل)
      setPageIndex(1);
      return;
    }
  }

  const goToPage = (pageNumber) => {
    const num = Number(pageNumber);

    // ===========================
    // ❌ التحقق من إدخال غير صحيح
    // ===========================
    if (isNaN(num) || num < 1 || num > pages.length) {
      setPageIndex(1); // رجّعه للصفحة الثانية دائماً
      return;
    }

    // ===========================
    // 📱 Mobile OR single mode
    // ===========================
    if (isMobile || viewMode === "single") {
      setPageIndex(num - 1);
      return;
    }

    // ===========================
    // 📘 Spread Mode (لجميع التابات الأخرى)
    // ===========================
    if (num === 1) {
      setPageIndex(0);
      return;
    }

    // لو فردية → اعرض السابقة
    if (num % 2 === 1) {
      setPageIndex(num - 2);
      return;
    }

    // لو زوجية → اعرضها مع التالية
    setPageIndex(num - 1);
  };

  const nextPage = () => {
    // =============== Posters → always single ===============
    if (activeTab === "posterVocab" || activeTab === "flash") {
      if (pageIndex < pages.length - 1) {
        setPageIndex(pageIndex + 1);
      }
      return;
    }

    // =============== DEFAULT LOGIC FOR OTHER TABS ===============
    if (isMobile || viewMode === "single") {
      if (pageIndex < pages.length - 1) {
        setPageIndex(pageIndex + 1);
      }
    } else {
      if (pageIndex === 0) {
        setPageIndex(1);
      } else if (pageIndex < pages.length - 2) {
        setPageIndex(pageIndex + 2);
      }
    }
  };

  const prevPage = () => {
    // Posters → always one page
    if (activeTab === "posterVocab" || activeTab === "flash") {
      if (pageIndex > 0) setPageIndex(pageIndex - 1);
      return;
    }
    // Normal logic
    if (isMobile || viewMode === "single") {
      if (pageIndex > 0) setPageIndex(pageIndex - 1);
    } else {
      if (pageIndex === 1) setPageIndex(0);
      else if (pageIndex > 1) setPageIndex(pageIndex - 2);
    }
  };

  function goHome() {
    setPageIndex(1);
  }

  // ===========================================================
  //                 📌 FULLSCREEN
  // ===========================================================
  function toggleFullScreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen();
    else document.exitFullscreen();
  }

  // ===========================================================
  //                 📌 ZOOM & PANNING
  // ===========================================================
  function resetZoom() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function handleMouseDown(e) {
    if (zoom === 1) return;
    setIsDragging(true);
    start.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  const start = useRef({ x: 0, y: 0 });
  function handleTouchStart(e) {
    if (zoom === 1) return;

    const touch = e.touches[0];
    setIsDragging(true);
    touchStart.current = {
      x: touch.clientX - offset.x,
      y: touch.clientY - offset.y,
    };
  }

  function handleTouchMove(e) {
    if (!isDragging) return;

    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - touchStart.current.x,
      y: touch.clientY - touchStart.current.y,
    });
  }

  function handleTouchEnd() {
    setIsDragging(false);
  }

  // ===========================================================
  //                 📌 UNITS LIST
  // ===========================================================

  const studentUnits = [
    { id: 1, label: "Unit 1", start: 4, pages: 6 },
    { id: 2, label: "Unit 2", start: 10, pages: 6 },
    { id: 3, label: "Review 1 and 2", start: 16, pages: 6 },
    { id: 4, label: "Unit 3", start: 22, pages: 6 },
    { id: 5, label: "Unit 4", start: 28, pages: 6 },
    { id: 6, label: "Review 3 and 4", start: 34, pages: 6 },
    { id: 7, label: "Unit 5", start: 40, pages: 6 },
    { id: 8, label: "Unit 6", start: 46, pages: 6 },
    { id: 9, label: "Review 5 and 6", start: 52, pages: 6 },
    { id: 10, label: "Unit 7", start: 58, pages: 6 },
    { id: 11, label: "Unit 8", start: 64, pages: 6 },
    { id: 12, label: "Review 7 and 8", start: 70, pages: 6 },
    { id: 13, label: "Unit 9", start: 76, pages: 6 },
    { id: 14, label: "Unit 10", start: 82, pages: 6 },
    { id: 15, label: "Review 9 and 10", start: 88, pages: 6 },
  ];

  const workbookUnits = [
    { id: 1, label: "Unit 1", start: 3, pages: 7 },
    { id: 2, label: "Unit 2", start: 9, pages: 6 },
    { id: 3, label: "Unit 3", start: 15, pages: 6 },
    { id: 4, label: "Unit 4", start: 21, pages: 6 },
    { id: 5, label: "Unit 5", start: 27, pages: 6 },
    { id: 6, label: "Unit 6", start: 33, pages: 6 },
    { id: 7, label: "Unit 7", start: 39, pages: 6 },
    { id: 8, label: "Unit 8", start: 45, pages: 6 },
    { id: 9, label: "Unit 9", start: 51, pages: 6 },
    { id: 10, label: "Unit 10", start: 57, pages: 6 },
  ];

  const teacherUnits = [
    {
      id: 1,
      label: "Introduction",
      start: 4,
      pages: 34,
    },
    {
      id: 2,
      label: "Unit 1",
      start: 39,
      pages: 10,
    },
    {
      id: 3,
      label: "Unit 2",
      start: 50,
      pages: 11,
    },
    {
      id: 4,
      label: "Unit 3",
      start: 62,
      pages: 9,
    },
    {
      id: 5,
      label: "Unit 4",
      start: 72,
      pages: 11,
    },
    {
      id: 6,
      label: "Unit 5",
      start: 84,
      pages: 9,
    },
    {
      id: 7,
      label: "Unit 6",
      start: 93,
      pages: 12,
    },
    {
      id: 8,
      label: "Unit 7",
      start: 106,
      pages: 9,
    },

    {
      id: 9,
      label: "Unit 8",
      start: 115,
      pages: 13,
    },
    {
      id: 10,
      label: "Unit 9",
      start: 128,
      pages: 8,
    },
    {
      id: 11,
      label: "Unit 10",
      start: 136,
      pages: 12,
    },
    {
      id: 12,
      label: "Teaching Contractions",
      start: 149,
      pages: 3,
    },
    {
      id: 13,
      label: "Instructions and Answer Keys",
      start: 153,
      pages: teacherPages.length - 152,
    },
  ];

  const flashUnits = [
    { id: 1, label: "Flashcards", start: 2, pages: flashPages.length },
  ];

  const posterUnits = [
    { id: 1, label: "Posters", start: 2, pages: posterPages.length },
  ];
  const posterVocabUnits = [
    { id: 1, label: "Unit 1", start: 1, pages: 1 },
    { id: 2, label: "Unit 2", start: 1, pages: 1 },
  ];

  // ===========================================================
  //                 📌 PAGE RENDERER
  // ===========================================================
  function renderPage(content) {
    if (activeTab === "flash") {
      return <FlashCardViewer card={content} openPopup={openPopup} />;
    }
    if (typeof content === "string") {
      return <img src={content} className="w-full h-full object-contain" />;
    }
    return content;
  }

  // ===========================================================
  //                 📌 TABS DEFINITION
  // ===========================================================
  const tabs = [
    { id: "student", label: "Student’s Book" },
    { id: "work", label: "Workbook" },
    { id: "teacher", label: "Teacher’s Book" },
    { id: "flash", label: "Flashcards" },
    // { id: "poster", label: "Grammar Poster" },
    { id: "posterVocab", label: "Posters" },
  ];
  const sidebarUnits = {
    student: studentUnits,
    work: workbookUnits,
    teacher: teacherUnits,
    flash: flashUnits,
    poster: posterUnits,
    posterVocab: posterVocabUnits,
  }[activeTab];

  const studentBookInfo = {
    cover: stbookCover,
    title: `Right 1 Class Book`,
    pages: studentPages().length,
  };

  const workbookInfo = {
    cover: workbookCover,
    title: "Right 1 Workbook",
    pages: workbookPages().length,
  };

  const teacherInfo = {
    cover: teacherBookCover,
    title: "Right 1 Teacher's Book",
    pages: teacherPages.length,
  };

  const flashInfo = {
    cover: fcBookCover,
    title: "Right 1 flashcard",
    pages: flashPages.length,
  };

  const posterInfo = {
    cover: posterBookCover,
    title: "Right 1 Grammar Poster",
    pages: posterPages.length,
  };
  const posterVocabInfo = {
    cover: "",
    title: "Right 1 Posters",
    pages: postersVocabPages().length,
  };
  const bookInfoSelector = {
    student: studentBookInfo,
    work: workbookInfo,
    teacher: teacherInfo,
    flash: flashInfo,
    poster: posterInfo,
    posterVocab: posterVocabInfo,
  };
  const isLastPage = pageIndex === pages.length - 1;
  const isLastSpread = viewMode === "spread" && pageIndex === pages.length - 2;
  // ===========================================================
  //                 📌 RENDER
  // ===========================================================
  return (
    <>
      {/* ===================== TOP NAV ===================== */}
      <TopNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logo={logo}
        menuIcon={menu}
        tabs={tabs}
        mobileTabsOpen={mobileTabsOpen}
        setMobileTabsOpen={setMobileTabsOpen}
        isMobile={isMobile}
      />

      {/* ===================== MAIN PAGE VIEW ===================== */}
      <div
        className="content-wrapper overflow-auto lg:overflow-hidden w-full h-[87vh] flex items-center justify-center relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        //-----------swipe function---------------------
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ==== NAVIGATION ARROWS (Next / Prev) ==== */}
        {pageIndex > 0 && (
          <svg
            width="30"
            height="30"
            viewBox="0 0 90 90"
            onClick={prevPage}
            className="nav-btn absolute left-10 w-14 h-14 rounded-full flex items-center justify-center z-[9999]  transition"
          >
            <image href={back} x="0" y="0" width="90" height="90" />
          </svg>
        )}

        {pageIndex < pages.length - 1 && (
          <svg
            width="30"
            height="30"
            viewBox="0 0 90 90"
            onClick={nextPage}
            className="nav-btn absolute right-10 w-14 h-14 rounded-full  flex items-center justify-center z-[99999999] transition"
          >
            <image href={next} x="0" y="0" width="90" height="90" />
          </svg>
        )}

        {/* POSTERS ALWAYS SINGLE PAGE */}
        {isMobile ||
        activeTab === "poster" ||
        activeTab === "posterVocab" ||
        activeTab === "flash" ||
        viewMode === "single" ||
        pageIndex === 0 ||
        isLastPage ||
        isLastSpread ? (
          <div
            className="bg-white rounded-2xl shadow-2xl border flex items-center justify-center overflow-hidden self-center"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              cursor: zoom === 1 ? "default" : isDragging ? "grabbing" : "grab",
            }}
          >
            {renderPage(pages[pageIndex])}
          </div>
        ) : (
          // Spread Mode

          <div
            className="bg-white rounded-2xl shadow-2xl border grid grid-cols-2 overflow-hidden self-center"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              cursor: zoom === 1 ? "default" : isDragging ? "grabbing" : "grab",
            }}
          >
            <div className="flex items-center justify-center border-r">
              {renderPage(pages[pageIndex])}
            </div>
            <div className="flex items-center justify-center border-l">
              {renderPage(pages[pageIndex + 1])}
            </div>
          </div>
        )}
      </div>

      {/* ===================== BOTTOM BAR ===================== */}
      <BottomBar
        key={pageIndex}
        pageIndex={pageIndex}
        totalPages={pages.length}
        goToIndex={goHome}
        zoomIn={() => setZoom((z) => z + 0.2)}
        zoomOut={() => setZoom((z) => z - 0.2)}
        resetZoom={resetZoom}
        toggleFullScreen={toggleFullScreen}
        goToPage={goToPage}
        isMobile={isMobile}
        viewMode={viewMode}
        activeTab={activeTab}
        setViewMode={setViewMode}
        icons={{
          menu,
          home,
          zoomIn,
          zoomOut,
          fullScreen,
          onePage,
          openBook,
          openSidebar: () => setLeftBarOpen(true),
          openRightSidebar: () => setRightBarOpen(true),
          keyIcon: FaKey,
        }}
        teacherPdf={teacherPdf} // 👈 جديد
      />

      {/* ===================== LEFT SIDEBAR ===================== */}
      <LeftSidebar
        isOpen={leftBarOpen}
        close={() => setLeftBarOpen(false)}
        units={sidebarUnits} // ← داتا التاب الصحيح
        goToPage={goToPage}
        book={bookInfoSelector[activeTab]} // ← 🔥 أهم سطر
      />

      {/* ===================== RIGHT SIDEBAR ===================== */}
      <RightSidebar
        isOpen={rightBarOpen}
        close={() => setRightBarOpen(false)}
        menu={[
          { key: "audio", label: "Audio Button", icon: audioBtn },
          { key: "video", label: "Video Button", icon: pauseBtn },
          { key: "arrow", label: "Arrow Button", icon: arrowBtn },
          { key: "prev", label: "Prev Button", icon: back },
          { key: "next", label: "Next Button", icon: next },
        ]}
      />

      {/* ===================== POPUP ===================== */}
      <Popup isOpen={popupOpen} onClose={closePopup} type={popupContent?.type}>
        {/* ========== WORKBOOK ========== */}
        {popupContent?.tab === "work" && popupContent?.type === "exercise" && (
          <WorkBookNavigator
            startIndex={popupContent.data.startIndex}
            mode="workbook"
          />
        )}

        {/* ========== POSTER VOCAB ========== */}
        {popupContent?.tab === "posterVocab" &&
          popupContent?.type === "exercise" && (
            <PosterVocabNavigator
              startIndex={popupContent.data.startIndex}
              mode="posterVocab"
            />
          )}

        {/* ========== STUDENT + TEACHER ONLY ========== */}
        {(popupContent?.tab === "student" || popupContent?.tab === "teacher") &&
          popupContent?.type === "exercise" && (
            <LessonNavigator startIndex={popupContent.data.startIndex} />
          )}

        {/* ========== أي popup آخر (صور / فيديو / نص) ========== */}
        {popupContent?.type !== "exercise" && popupContent?.data}
      </Popup>
    </>
  );
}

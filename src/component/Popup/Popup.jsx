import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Popup.css";

const Popup = ({
  isOpen,
  onClose,
  type = "default",
  children
}) => {
  if (!isOpen) return null;

  // اختر حجم البوب اب بناء على النوع
  const sizeClass = {
    audio: "audio-size",
    video: "video-size",
    exercise: "exercise-size",
    image: "image-size",
    html: "fullscreen-size",
    default: "fullscreen-size",
  }[type];

  return ReactDOM.createPortal(
    <div className={`popup-overlay popup-${type}`}>
      <div className={`popup-content ${sizeClass}`}>
        <button className={`popup-close-btn type-${type}`} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* محتوى البوب اب */}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;

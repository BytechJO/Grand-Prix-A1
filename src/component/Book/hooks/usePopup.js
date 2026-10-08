import { useState } from "react";

export default function usePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openPopup = (type, data = null) => {
    setContent({ type, data });
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setContent(null);
  };

  return {
    isOpen,
    content,
    openPopup,
    closePopup,
  };
}

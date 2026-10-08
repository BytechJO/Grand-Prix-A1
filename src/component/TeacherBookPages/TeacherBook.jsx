import { teacherPages } from "../BookData/teacherPages"; // عدّل المسار حسب مكان الملف
import { useState } from "react";
export default function TeacherBook({ teacher }) {
  const [currentPage, setCurrentPage] = useState(0);
console.log(teacher);

  return (
    <div
      className="page1-img-wrapper-teacher"
      style={{
        backgroundImage: `url(${teacher})`,
      }}
    />
  );
}

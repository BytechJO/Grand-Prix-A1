import { useState } from "react";
import Swal from "sweetalert2";
import "./LessonNavigator.css";
import next from "../../assets/unit1/imgs/next btn white.svg";
import back from "../../assets/unit1/imgs/back btn white.svg";
import { lessons } from "./LessonData";

export default function LessonNavigator({ startIndex = 0 }) {
  const [index, setIndex] = useState(startIndex);

  const CurrentLesson = lessons[index].component;
  const handleNext = () => {
    const lesson = lessons[index];

    if (lesson.lastOfUnit && lesson.unit % 2 === 0 && lesson.isReview) {
      Swal.fire({
        html: `
          <div class="custom-popup-content">
            <h2 style="font-size:25px;color=black">Congratulations! You've finished all the exercises of Unit🎉</br> Do you want to continue to Unit ${lesson.unit + 1} exercises?</h2>
          </div>
        `,
        imageWidth: 200,
        imageHeight: 200,
        icon: "question",
        background: "#dfeaf6",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true, // ✔️ هذا هو السبب الرئيسي
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        customClass: {
          popup: "my-popup",
          image: "my-image",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-button",
          cancelButton: "my-button1",
        },
      }).then((res) => {
        if (res.isConfirmed) setIndex(index + 1);
      });
      return;
    }
    if (lesson.lastOfUnit && lesson.unit % 2 === 0) {
      Swal.fire({
        html: `
          <div class="custom-popup-content">
            <h2 style="font-size:25px;color=black">Congratulations! You've finished all the exercises of Unit🎉</br>Do you want to continue to the review exercises?</h2>
          </div>
        `,
        imageWidth: 200,
        imageHeight: 200,
        icon: "question",
        background: "#dfeaf6",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true, // ✔️ هذا هو السبب الرئيسي
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        customClass: {
          popup: "my-popup",
          image: "my-image",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-button",
          cancelButton: "my-button1",
        },
      }).then((res) => {
        if (res.isConfirmed) setIndex(index + 1);
      });

      return;
    }
    // آخر درس في الوحدة
    if (lesson.lastOfUnit) {
      Swal.fire({
        html: `
          <div class="custom-popup-content">
            <h2 style="font-size:25px;color=black">Congratulations! You've finished all the exercises of Unit🎉</br> Do you want to continue to Unit ${lesson.unit + 1} exercises?</h2>
          </div>
        `,
        imageWidth: 200,
        imageHeight: 200,
        icon: "question",
        background: "#dfeaf6",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true, // ✔️ هذا هو السبب الرئيسي
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        customClass: {
          popup: "my-popup",
          image: "my-image",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-button",
          cancelButton: "my-button1",
        },
      }).then((res) => {
        if (res.isConfirmed) setIndex(index + 1);
      });
      return;
    }

    // آخر درس في المراجعة
    if (lesson.lastOfReview) {
      Swal.fire({
        html: `
          <div class="custom-popup-content">
            <h2 style="font-size:25px;color=black">Congratulations! You've finished all the exercises 🎉</br>
                Do you want to restart from the beginning?</h2>
          </div>
        `,
        imageWidth: 200,
        imageHeight: 200,
        icon: "question",
        background: "#dfeaf6",
        confirmButtonText: "Start Again",
        cancelButtonText: "No",
        showCancelButton: true, // ✔️ هذا هو السبب الرئيسي
        allowOutsideClick: false,
        allowEscapeKey: false,
        buttonsStyling: false,
        customClass: {
          popup: "my-popup",
          image: "my-image",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-button",
          cancelButton: "my-button1",
        },
      }).then((res) => {
        if (res.isConfirmed) setIndex(0);
      });
      return;
    }

    // انتقال عادي
    setIndex(index + 1);
  };
  const isFirst = index === 0;

  return (
    <div>
      <div
        className="nav-buttons"
        style={{
          display: "flex",
          width: "100%",
          gap: "20px",
          justifyContent: "flex-start",
          backgroundColor: "#430f68",
        }}
      >
        {index ? (
          <button
            onClick={() => setIndex(index - 1)}
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
         >
            <svg
              width="15"
              height="15"
              viewBox="0 0 90 90"
              style={{
                padding: "12px",
              }}
              className="nav-btn-ex w-10 h-10 rounded-full transition"
            >
              <image href={back} x="0" y="0" width="90" height="90" />
            </svg>{" "}
            Previous activity
          </button>
        ) : (
          <button
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
                 disabled={isFirst}
            className={`prev-btn ${isFirst ? "disabled" : ""}`}
      
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 90 90"
              style={{
                padding: "12px",
              }}
              className="nav-btn-ex w-10 h-10 rounded-full transition"
            >
              <image href={back} x="0" y="0" width="90" height="90" />
            </svg>{" "}
            Previous activity
          </button>
        )}

        <button
          onClick={handleNext}
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Next activity
          <svg
            width="15"
            height="15"
            viewBox="0 0 90 90"
            style={{
              padding: "12px",
            }}
            className="nav-btn-ex w-10 h-10 rounded-full transition"
          >
            <image href={next} x="0" y="0" width="90" height="90" />
          </svg>
        </button>
      </div>

      <CurrentLesson />
    </div>
  );
}
import React, { useState, useEffect } from "react";

export default function PleaseLogin() {
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerHide();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const triggerHide = () => {
    setHide(true);
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay خلف الرسالة */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40`}
        onClick={triggerHide}
      ></div>

      {/* صندوق الرسالة */}
      <div
        style={{ zIndex: 50 }}
        className={`fixed inset-0 flex items-center justify-center pointer-events-none`}
      >
        <div
          className={`relative bg-[#eee] rounded-[15px] text-[18px] sm:text-[20px] border border-red-500 w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] h-[100px] flex justify-center items-center text-center px-4
            transition-opacity duration-500 ease-in-out pointer-events-auto
            ${hide ? "opacity-0" : "opacity-100"}`}
        >
          <span
            onClick={triggerHide}
            className={`absolute top-0 right-0 bg-[#ffffffc7] text-black cursor-pointer flex justify-center items-center select-none
              ${
                window.innerWidth > 768
                  ? "w-[45px] h-[45px] rounded-bl-[20px] rounded-tr-[15px] text-[2em]"
                  : "w-[25px] h-[25px] rounded-bl-[10px] rounded-tr-[10px] text-[16px]"
              }
            `}
            role="button"
            aria-label="Close"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") triggerHide();
            }}
          >
            ×
          </span>

          <div className="pointer-events-none select-none">Please Login To Continue</div>
        </div>
      </div>
    </>
  );
}

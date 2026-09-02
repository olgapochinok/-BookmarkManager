import { useState, useRef, useEffect } from "react";

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;
const DEFAULT_WIDTH = 300;

function Sidebar( {children} ) {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const isResized = useRef(false);

  const moveResizing = (e) => {
    if (!isResized.current) return;
    let newWidth = e.clientX;

    if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
    if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
    setWidth(newWidth);
  };
  const stopResizing = () => {
    isResized.current = false;
  };
  useEffect(() => {
    window.addEventListener("mousemove", moveResizing);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", moveResizing);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  return (
    <>
      <div className="sidebar" style={{ width: `${width / 16}rem` }}>{children}</div>
      <div
        onMouseDown={() => {
          isResized.current = true;
        }}
        style={{
          width: "8px",
          cursor: "col-resize",
          background: isResized ? "#4b5563" : "#e5e7eb",
          transition: "background 0.2s",
        }}
      ></div>
    </>
  );
}

export default Sidebar;

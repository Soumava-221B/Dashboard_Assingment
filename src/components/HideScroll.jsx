import React, { forwardRef } from "react";

const hideScrollStyle = {
  WebkitOverflowScrolling: "touch",
  overflowX: "auto",
  overflowY: "hidden",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const HideScroll = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div ref={ref} style={hideScrollStyle} className={className} {...props}>
      {children}
    </div>
  );
});

export default HideScroll;

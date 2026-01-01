import React from "react";

const Heading = ({ children, className = "" }) => {
  return (
    <div
      className={`font-medium text-[36px] md:text-[56px] text-[#070c03] ${className}`}
    >
      {children}
    </div>
  );
};

export default Heading;

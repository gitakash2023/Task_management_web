import React, { useState } from 'react';

const DashboardBox = ({ icon, text, count }) => {
  const [isHovered, setIsHovered] = useState(false);

  const boxStyle = {
    width: "210px",
    height: "120px",
    borderRadius: '7px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.3s',
    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
  };

  const iconBgStyle = {
    marginBottom: '10px',
  };

  const iconStyle = {
    fontSize: '5rem',
  };

  const textStyle = {
    textAlign: 'center',
  };

  return (
    <div
      className="card bg-white shadow-sm rounded-lg"
      style={boxStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon-bg d-flex" style={iconBgStyle}>
        <span className="text-primary fs-4" style={iconStyle}>{icon}</span>
      </div>
      <div className="text-end text-xl">{count}</div>
      <div className="ms-3 flex-grow-1 fs-8" style={textStyle}>{text}</div>
    </div>
  );
};

export default DashboardBox;

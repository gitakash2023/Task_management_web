import React from 'react';

function CustomButton({ text, icon }) {
  return (
    <div className="btn-container">
      <button className="btn custom-btn">
        {icon} {text}
      </button>
      <style jsx>{`
        .btn-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px; 
        }
        .custom-btn {
          background-color: #87CEFA; 
          color: #fff; 
          border-color: #87CEFA; 
        }
        .custom-btn:hover {
          background-color: #5f9ea0; 
          border-color: #5f9ea0; 
        }
      `}</style>
    </div>
  );
}

export default CustomButton;

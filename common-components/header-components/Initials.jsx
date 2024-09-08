const initials = ({ initials, email }) => (
    <div className="user-container">
      <div className="user-initial">{initials}</div>
      <div className="user-text">{email}</div>
  
      <style jsx>{`
        .user-container {
          background-color: white;
          padding: 5px;
          border-radius: 5px;
          cursor: pointer;
          opacity: 0.5;
          border-left: 2px solid gray;
          border-right: 2px solid gray;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
        }
        .user-text {
          font-weight: bold;
          color: black;
        }
        .user-initial {
          border-radius: 50%;
          width: 30px;
          height: 30px;
          background-color: #f0f0f0;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          color: black;
        }
      `}</style>
    </div>
  );
  
  export default initials;
  
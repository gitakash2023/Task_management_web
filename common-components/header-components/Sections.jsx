import { FaQuestionCircle } from 'react-icons/fa';

const Sections = ({ companyInitial }) => (
  <div className="sections-container">
    <Section icon={<FaQuestionCircle />} text="Get Help" />
   

    <style jsx>{`
      .sections-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: auto; /* Move to the end */
      }
    `}</style>
  </div>
);

const Section = ({ icon, text }) => (
  <div className="section">
    <div className="icon">{icon}</div>
    <div className="text">{text}</div>

    <style jsx>{`
      .section {
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        opacity: 0.5;
        display: flex;
        align-items: center;
      }
      .icon {
        margin-right: 5px;
        color: black;
      }
      .text {
        font-weight: bold;
        color: black;
      }
    `}</style>
  </div>
);

export default Sections;

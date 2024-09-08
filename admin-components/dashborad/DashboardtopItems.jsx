import React from 'react';
import DashboardBox from "../../common-components/DashboardBox"
import { FaUser, FaCheckCircle, FaSpinner, FaHourglass, FaExclamationCircle } from 'react-icons/fa';

const dashboardData = [
  { icon: <FaUser style={{ color: 'blue' }} />, text: 'Complete', count: 5011 },
  { icon: <FaCheckCircle style={{ color: 'green' }} />, text: 'Duplicate', count: 2 },
  { icon: <FaSpinner style={{ color: 'orange' }} />, text: 'In Progress', count: 212 },
  { icon: <FaHourglass style={{ color: 'yellow' }} />, text: 'Insuff', count: 383 },
  { icon: <FaExclamationCircle style={{ color: 'red' }} />, text: 'Reverification', count: 13 },
  { icon: <FaExclamationCircle style={{ color: 'red' }} />, text: 'Stop', count: 54 },
  // Add more objects as needed
];

const DashboardtopItems = () => {
  return (
    <div className="d-flex flex-wrap">
      {dashboardData.map((item, index) => (
        <div key={index} style={{ marginRight: '10px', marginBottom: '10px' }}>
          <DashboardBox icon={item.icon} text={item.text} count={item.count} />
        </div>
      ))}
    </div>
  );
};

export default DashboardtopItems;

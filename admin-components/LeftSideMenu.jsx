"use client";
import { FaTachometerAlt, FaTasks, FaCalendarAlt,  FaUserCog } from "react-icons/fa";
import MenuItem from '../common-components/MenuItem';

const LeftSideMenu = () => {
  return (
    <>
      <div className="bg-light text-white p-4" style={{ height: "100vh" }}>
        <ul className="list-unstyled">
          <MenuItem
            href="/admin/admin-dashboard"
            icon={FaTachometerAlt}
            label="Dashboard"
          />
          <MenuItem
            href="/admin/tasks"
            icon={FaTasks}
            label="Tasks"
          />
          <MenuItem
            href="/admin/calendar"
            icon={FaCalendarAlt}
            label="Calendar"
          />
         
          <MenuItem
            href="/admin/settings"
            icon={FaUserCog}
            label="Settings"
          />
        </ul>
      </div>
    </>
  );
};

export default LeftSideMenu;

"use client";

import LeftSideMenu from './LeftSideMenu';
import Header from "../common-components/Header"

const Layout = ({ children }) => {
  return (
    <>
     <Header/>
    
    
   
    <div className="d-flex">
      <LeftSideMenu />
      <div className="flex-grow-1">{children}</div>
    </div>
    </>
  );
};

export default Layout;
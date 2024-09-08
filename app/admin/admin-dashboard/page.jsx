"use client"
import Layout from '@/admin-components/Layout';
import DashboardtopItems from "../../../admin-components/dashborad/DashboardtopItems"
import LoggedInPage from "../../../common-components/LoggedInPage"

const Dashboard = () => {
  return (
    <>
      <Layout>
        <div style={{ backgroundColor: "rgba(128, 128, 128, 0.3)", minHeight: "100vh" }}>
          <div className="container">
            <LoggedInPage/>
            <DashboardtopItems />
            <div className="parent-container" style={{ width: "100%",  backgroundColor: "white", borderRadius: "20px" }}>
              {/* <DisplayChart /> */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;

// pages/admin/Companies.js
"use client"
import Layout from "../../../admin-components/Layout"
import DashboardBody from "../../../admin-components/dashborad/Dashboardbody"

const Tasks = () => {
  return (
    <Layout>

<div className="container-fluid" style={{  minHeight: "100vh" }}>
  <div className="container">
    <DashboardBody />
  </div>
</div>
    </Layout>
  );
};

export default Tasks;

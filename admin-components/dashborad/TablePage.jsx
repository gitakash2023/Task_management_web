import React from 'react';

const TablePage = () => {
    const clientListData = [
        {
            category: 'Active',
            clientCode: 'CL001',
            clientName: 'Client A',
            representatives: 'John Doe',
            designation: 'Manager',
            department: 'HR',
            email: 'john.doe@example.com',
            mobileNo: '1234567890',
            loginDetails: 'Edit Option',
            totalReceivedCandidates: 50,
            totalCompleteCandidatesVerification: 40,
            totalInProcessCandidatesVerification: 10,
            totalInsufficientCandidateData: 5,
            totalReceivedData: 100,
            totalPendingData: 20
        },
        {
            category: 'Inactive',
            clientCode: 'CL002',
            clientName: 'Client B',
            representatives: 'Jane Smith',
            designation: 'Director',
            department: 'Finance',
            email: 'jane.smith@example.com',
            mobileNo: '9876543210',
            loginDetails: 'Edit Option',
            totalReceivedCandidates: 30,
            totalCompleteCandidatesVerification: 25,
            totalInProcessCandidatesVerification: 5,
            totalInsufficientCandidateData: 2,
            totalReceivedData: 60,
            totalPendingData: 10
        },
        {
          category: 'Inactive',
          clientCode: 'CL002',
          clientName: 'Client B',
          representatives: 'Jane Smith',
          designation: 'Director',
          department: 'Finance',
          email: 'jane.smith@example.com',
          mobileNo: '9876543210',
          loginDetails: 'Edit Option',
          totalReceivedCandidates: 30,
          totalCompleteCandidatesVerification: 25,
          totalInProcessCandidatesVerification: 5,
          totalInsufficientCandidateData: 2,
          totalReceivedData: 60,
          totalPendingData: 10
      },
      {
        category: 'Inactive',
        clientCode: 'CL002',
        clientName: 'Client B',
        representatives: 'Jane Smith',
        designation: 'Director',
        department: 'Finance',
        email: 'jane.smith@example.com',
        mobileNo: '9876543210',
        loginDetails: 'Edit Option',
        totalReceivedCandidates: 30,
        totalCompleteCandidatesVerification: 25,
        totalInProcessCandidatesVerification: 5,
        totalInsufficientCandidateData: 2,
        totalReceivedData: 60,
        totalPendingData: 10
    },
    {
      category: 'Inactive',
      clientCode: 'CL002',
      clientName: 'Client B',
      representatives: 'Jane Smith',
      designation: 'Director',
      department: 'Finance',
      email: 'jane.smith@example.com',
      mobileNo: '9876543210',
      loginDetails: 'Edit Option',
      totalReceivedCandidates: 30,
      totalCompleteCandidatesVerification: 25,
      totalInProcessCandidatesVerification: 5,
      totalInsufficientCandidateData: 2,
      totalReceivedData: 60,
      totalPendingData: 10
  },
  {
    category: 'Inactive',
    clientCode: 'CL002',
    clientName: 'Client B',
    representatives: 'Jane Smith',
    designation: 'Director',
    department: 'Finance',
    email: 'jane.smith@example.com',
    mobileNo: '9876543210',
    loginDetails: 'Edit Option',
    totalReceivedCandidates: 30,
    totalCompleteCandidatesVerification: 25,
    totalInProcessCandidatesVerification: 5,
    totalInsufficientCandidateData: 2,
    totalReceivedData: 60,
    totalPendingData: 10
},
        // Add more client objects as needed
    ];

    return (
        <div className="container-fluid" style={{ minHeight: "100vh",  }}>
            <div className="container">
                <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 10px)', overflowY: 'auto' }}>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Category</th>
                                <th>Client Code</th>
                                <th>Name of Client</th>
                                <th>Name of Representatives</th>
                                <th>Designation</th>
                                <th>Department</th>
                                <th>Email ID</th>
                                <th>Mobile No</th>
                                <th>Login Details (Edit Option)</th>
                                <th>Total Number of Candidate Received</th>
                                <th>Total Numbers of Complete Candidate Verification</th>
                                <th>Total Number of In Process Candidate Verification</th>
                                <th>Total Number of Insufficient Candidate Data</th>
                                <th>Total Number of Received Data</th>
                                <th>Total Number of Pending Data</th>
                                <th>Edit</th>
                                <th>Change Category</th>
                                <th>Check ID and Password and Remail ID and password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientListData.map((client, index) => (
                                <tr key={index}>
                                    <td>{client.category}</td>
                                    <td>{client.clientCode}</td>
                                    <td>{client.clientName}</td>
                                    <td>{client.representatives}</td>
                                    <td>{client.designation}</td>
                                    <td>{client.department}</td>
                                    <td>{client.email}</td>
                                    <td>{client.mobileNo}</td>
                                    <td>{client.loginDetails}</td>
                                    <td>{client.totalReceivedCandidates}</td>
                                    <td>{client.totalCompleteCandidatesVerification}</td>
                                    <td>{client.totalInProcessCandidatesVerification}</td>
                                    <td>{client.totalInsufficientCandidateData}</td>
                                    <td>{client.totalReceivedData}</td>
                                    <td>{client.totalPendingData}</td>
                                    <td><button className="btn btn-primary">Edit</button></td>
                                    <td><button className="btn btn-secondary">Change Category</button></td>
                                    <td><button className="btn btn-info">Check ID and Password</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TablePage;

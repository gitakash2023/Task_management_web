const staticColumns = [
  { field: "_id", headerName: "Task ID", width: 150 },
  { field: "title", headerName: "Title", width: 250 },
  { field: "description", headerName: "Description", width: 300 },
 
  // { field: "dueDate", headerName: "Due Date", width: 200 },
  { field: "createdAt", headerName: "Created At", width: 200 },
 
];

export default staticColumns;


// const updateTaskList = async () => {
//   try {
//     setLoadingData(true);
//     const userId = JSON.parse(localStorage.getItem('user'))?._id;

//     if (!userId) {
//       throw new Error("User ID not found in localStorage");
//     }

//     // Send searchQuery and statusFilter to the backend as query parameters
//     const response = await _getAll(`/api/tasks?userId=${userId}&search=${searchQuery}&status=${statusFilter}`);
//     setTaskListData(response);
//   } catch (error) {
//     console.error("Failed to fetch task data. Please try again later.", error);
//   } finally {
//     setLoadingData(false);
//   }
// };
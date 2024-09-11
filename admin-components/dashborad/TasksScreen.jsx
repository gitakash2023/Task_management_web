"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Grid, CircularProgress } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import NewTaskForm from '../../app/admin/tasks/tasks-components/NewTaskForm';
import TasksList from '../../app/admin/tasks/tasks-components/TasksList';
import { _getAll } from "@/utils/apiUtils";

function TasksScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskListData, setTaskListData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  // Define searchQuery and statusFilter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    updateTaskList();
  }, [searchQuery, statusFilter]); // Add searchQuery and statusFilter as dependencies

  const handleOpenModal = async (task) => {
    try {
      setLoadingModal(true);
      setSelectedTask(task);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to open modal:", error);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const updateTaskList = async () => {
    try {
      setLoadingData(true);
      const userId = JSON.parse(localStorage.getItem('user'))?._id;

      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      // Use the defined searchQuery and statusFilter state variables
      const response = await _getAll(`/api/tasks?userId=${userId}&search=${searchQuery}&status=${statusFilter}`);
      
      // Extract task data from response
      if (response && response.data) {
        setTaskListData(response.data); // Use response.data directly
      } else {
        console.warn("Response data is not in expected format");
      }
    } catch (error) {
      console.error("Failed to fetch task data. Please try again later.", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleNewTaskClick = () => {
    handleOpenModal(null);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ margin: "10px" }}>
          {/* Placeholder for additional buttons or elements */}
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ margin: "10px" }}>
            <Button
              variant="contained"
              startIcon={<BsPlus style={{ fontSize: "1.2em" }} />}
              onClick={handleNewTaskClick}
              disabled={loadingModal}
            >
              {loadingModal ? <CircularProgress size={24} /> : "New Task"}
            </Button>
          </div>
        </div>
      </div>
      <TasksList
        taskListData={taskListData}
        onEdit={handleOpenModal}
        onAdd={handleOpenModal}
        updateTaskList={updateTaskList}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Grid container spacing={2} style={{ padding: '16px' }}>
          <Grid item xs={12}>
            <NewTaskForm
              task={selectedTask}
              onClose={handleCloseModal}
              updateTaskList={updateTaskList}
            />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}

export default TasksScreen;

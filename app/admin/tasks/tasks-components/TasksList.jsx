"use client";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, TextField } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { _delete, _update } from '@/utils/apiUtils'; // Assuming _update is used for updating tasks
import staticColumns from './columns'; // Assuming you have a separate file for task columns

export default function TasksList({ taskListData, onEdit, updateTaskList }) {
    const [filteredTaskListData, setFilteredTaskListData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dialogVisibility, setDialogVisibility] = useState({ type: null, open: false });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Map MongoDB _id to id for DataGrid
        const tasksWithId = taskListData.map(task => ({ ...task, id: task._id }));
        setFilteredTaskListData(tasksWithId);
    }, [taskListData]);

    useEffect(() => {
        filterData(searchQuery, statusFilter);
    }, [searchQuery, statusFilter]);

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
        setDialogVisibility({ type: 'error', open: true });
    };

    const handleActionInitiation = (action, task) => {
        setSelectedTask(task);
        switch (action) {
            case 'edit':
                onEdit(task);
                break;
            case 'delete':
                setDialogVisibility({ type: 'delete', open: true });
                break;
            case 'preview':
                setDialogVisibility({ type: 'preview', open: true });
                break;
            default:
                break;
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const filterData = (query, status) => {
        let filteredData = taskListData;

        if (status !== 'All') {
            filteredData = filteredData.filter(task => task.status === status);
        }

        filteredData = filteredData.filter(task =>
            Object.values(task).some(value =>
                value && value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );

        setFilteredTaskListData(filteredData);
    };

    const handleStatusChange = async (task, newStatus) => {
        const updatedTask = { ...task, status: newStatus }; // Ensure 'status' is included
        try {
          await _update('/api/tasks', task._id, updatedTask); // Make sure this matches the backend endpoint
          updateTaskList(); // Refresh task list or state
        } catch (error) {
          handleErrorMessage('Failed to update task status. Please try again later.');
        }
    };
      
    const confirmDelete = async () => {
        try {
            await _delete('/api/tasks', selectedTask._id); 
            await updateTaskList();
            setDialogVisibility({ type: null, open: false });
        } catch (error) {
            handleErrorMessage('Failed to delete task. Please try again later.');
        }
    };

    const handleCloseDialog = () => {
        setDialogVisibility({ type: null, open: false });
    };

    return (
        <Box sx={{ padding: '16px', height: 440, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={handleSearch}
                    sx={{ marginLeft: '16px', flexGrow: 1 }}
                />
                <FormControl sx={{ minWidth: 150, marginLeft: '16px' }}>
                   
                    <Select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Status Filter' }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="ToDo">ToDo</MenuItem>
                        <MenuItem value="InProgress">In Progress</MenuItem>
                        <MenuItem value="Complete">Complete</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <DataGrid
                rows={filteredTaskListData}
                columns={[
                    ...staticColumns,
                    {
                        field: 'status',
                        headerName: 'Status',
                        width: 150,
                        renderCell: (params) => (
                            <Select
                                value={params.row.status || 'ToDo'}
                                onChange={(e) => handleStatusChange(params.row, e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Task Status' }}
                            >
                                <MenuItem value="ToDo">ToDo</MenuItem>
                                <MenuItem value="InProgress">In Progress</MenuItem>
                                <MenuItem value="Complete">Complete</MenuItem>
                            </Select>
                        ),
                    },
                    {
                        field: 'actions',
                        headerName: 'Actions',
                        width: 200,
                        renderCell: (params) => (
                            <>
                                <IconButton aria-label="edit" color="primary" onClick={() => handleActionInitiation('edit', params.row)}>
                                    <Edit />
                                </IconButton>
                                <IconButton aria-label="delete" color="secondary" onClick={() => handleActionInitiation('delete', params.row)}>
                                    <Delete />
                                </IconButton>
                                <IconButton aria-label="preview" color="default" onClick={() => handleActionInitiation('preview', params.row)}>
                                    <Preview />
                                </IconButton>
                            </>
                        ),
                    },
                ]}
                pageSize={5}
                getRowId={(row) => row._id} // Using 'id' which maps to MongoDB _id
            />

            {/* Delete Task */}
            <Dialog open={dialogVisibility.type === 'delete' && dialogVisibility.open} onClose={handleCloseDialog}>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>Are you sure you want to delete this task?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Preview Task */}
            <Dialog open={dialogVisibility.type === 'preview' && dialogVisibility.open} onClose={handleCloseDialog}>
                <DialogTitle>Preview Task</DialogTitle>
                <DialogContent>
                    <pre>{JSON.stringify(selectedTask, null, 2)}</pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Error Dialog */}
            <Dialog open={dialogVisibility.type === 'error' && dialogVisibility.open} onClose={handleCloseDialog}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>{errorMessage}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

"use client";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { _delete, _update } from '@/utils/apiUtils'; 
import staticColumns from './columns'; 
import SearchIcon from '@mui/icons-material/Search';

export default function TasksList({ taskListData, onEdit, updateTaskList, searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
    const [filteredTaskListData, setFilteredTaskListData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [dialogVisibility, setDialogVisibility] = useState({ type: null, open: false });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        filterData(searchQuery, statusFilter);
    }, [searchQuery, statusFilter, taskListData]);

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
        const updatedTask = { ...task, status: newStatus };
        try {
          await _update('/api/tasks', task._id, updatedTask); 
          updateTaskList(); 
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
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
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
                            <FormControl sx={{ minWidth: 150 }}>
                                <Select
                                    value={params.row.status}
                                    onChange={(event) => handleStatusChange(params.row, event.target.value)}
                                >
                                    <MenuItem value="ToDo">ToDo</MenuItem>
                                    <MenuItem value="InProgress">In Progress</MenuItem>
                                    <MenuItem value="Complete">Complete</MenuItem>
                                </Select>
                            </FormControl>
                        ),
                    },
                    {
                        field: 'actions',
                        headerName: 'Actions',
                        width: 200,
                        renderCell: (params) => (
                            <>
                                <IconButton color="primary" onClick={() => handleActionInitiation('edit', params.row)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleActionInitiation('delete', params.row)}>
                                    <Delete />
                                </IconButton>
                                <IconButton color="info" onClick={() => handleActionInitiation('preview', params.row)}>
                                    <Preview />
                                </IconButton>
                            </>
                        ),
                    },
                ]}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row._id} 
            />
            <Dialog open={dialogVisibility.open} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogVisibility.type === 'delete' ? 'Confirm Delete' : 'Preview Task'}
                </DialogTitle>
                <DialogContent>
                    {dialogVisibility.type === 'delete' ? (
                        <Typography>Are you sure you want to delete this task?</Typography>
                    ) : (
                        <Box>
                            {selectedTask && (
                                <>
                                    <Typography variant="h6">Task Preview</Typography>
                                    <Typography>Title: {selectedTask.title}</Typography>
                                    <Typography>Description: {selectedTask.description}</Typography>
                                    <Typography>Status: {selectedTask.status}</Typography>
                                    <Typography>Created At: {new Date(selectedTask.createdAt).toLocaleString()}</Typography>
                                </>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    {dialogVisibility.type === 'delete' && (
                        <Button onClick={confirmDelete} color="error">
                            Delete
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <Dialog open={dialogVisibility.type === 'error'} onClose={handleCloseDialog}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>{errorMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaFileAlt, FaCalendarAlt } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";

import { _create, _update } from "../../../../utils/apiUtils";

// Updated input fields
const inputFields = [
  {
    name: "title",
    placeholder: "Task Title",
    label: "Title",
    type: "text",
    icon: <FaFileAlt />,
  },
  {
    name: "description",
    placeholder: "Task Description",
    label: "Description",
    type: "textarea",  // Specify the type as textarea
    icon: <FaFileAlt />,
  },
  {
    name: "due_date",
    placeholder: "Due Date",
    label: "Due Date",
    type: "date",
    icon: <FaCalendarAlt />,
  },
];

const TaskForm = ({ task, onClose, updateTaskList }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const initialValues = {
    title: task ? task.title : "",
    description: task ? task.description : "",
    due_date: task ? task.due_date.split("T")[0] : "",
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      setSnackbarOpen(true);
    } else {
      setSnackbarOpen(false);
    }
  }, [successMessage, errorMessage]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmittingForm(true);
    try {
      if (task) {
        await _update("/api/tasks", task._id, values);
        setSuccessMessage("Task updated successfully!");
      } else {
        await _create("/api/tasks", values);
        setSuccessMessage("Task created successfully!");
      }
      onClose();
      updateTaskList();
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to save task data. Please try again later.");
    } finally {
      setSubmitting(false);
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: "80vh", width: "80%" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage || errorMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-md-6">
          <div className="card shadow p-4" style={{ borderRadius: "20px" }}>
            <h1 className="card-title text-center mb-4" style={{ fontWeight: "bold", color: "blue", fontSize: "2rem" }}>
              {task ? "Update Task" : "Create New Task"}
            </h1>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
              validate={(values) => {
                const errors = {};
                inputFields.forEach((field) => {
                  if (!values[field.name]) {
                    errors[field.name] = `${field.label} is required`;
                  }
                });
                return errors;
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {inputFields.map((field, index) => (
                    <div key={index} className="mb-3">
                      <label className="form-label" htmlFor={field.name} style={{ fontWeight: "bold" }}>
                        {field.label}
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ backgroundColor: "#f3f4f6" }}>
                          {field.icon}
                        </span>
                        {field.type === "textarea" ? (
                          <Field
                            as="textarea"
                            name={field.name}
                            placeholder={field.placeholder}
                            className="form-control"
                            rows="4" // Makes the textarea taller by default
                            style={{
                              backgroundColor: "#f3f4f6",
                              color: "black",
                              fontSize: "1rem",
                              border: "1px solid #ced4da",
                              borderRadius: "0.25rem",
                            }}
                          />
                        ) : (
                          <Field
                            type={field.type}
                            name={field.name}
                            placeholder={field.type !== "date" ? field.placeholder : ""}
                            className="form-control"
                            style={{
                              backgroundColor: "#f3f4f6",
                              color: "black",
                              fontSize: "1rem",
                              border: "1px solid #ced4da",
                              borderRadius: "0.25rem",
                            }}
                          />
                        )}
                      </div>
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="error-message"
                        style={{
                          fontSize: "0.8rem",
                          color: "red",
                          marginLeft: "5px",
                        }}
                      />
                    </div>
                  ))}
                  <div className="text-center d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={onClose}
                      style={{ fontSize: "1rem" }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                      style={{ fontSize: "1rem" }}
                    >
                      {isSubmitting ? (
                        <span>
                          <CircularProgress size={24} style={{ marginRight: "8px" }} />
                          Submitting...
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;

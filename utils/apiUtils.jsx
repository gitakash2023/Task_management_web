"use client";
const axios = require("axios");

// Function to retrieve the JWT token from local storage
const getAuthToken = () => {
  return localStorage.getItem("token"); // Assuming the token is stored with the key 'token'
};

// Function to handle API errors
const handleApiError = (error) => {
  console.error("API Error:", error);
  throw new Error("An error occurred while communicating with the API");
};

export const BASE_URL = "http://localhost:8000";

// Function to retrieve all posts
export const _getAll = async (endpoint) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Adding the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to create a new post
export const _create = async (endpoint, postData) => {
  try {
    const token = getAuthToken();
    console.log("Sending request to:", `${BASE_URL}${endpoint}`);
    const response = await axios.post(`${BASE_URL}${endpoint}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Login without token header
export const _createlogin = async (endpoint, postData) => {
  try {
    console.log("Sending request to:", `${BASE_URL}${endpoint}`);
    const response = await axios.post(`${BASE_URL}${endpoint}`, postData);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to retrieve a single post by ID (ID in the URL)
export const _getById = async (endpoint, id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BASE_URL}${endpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Adding the token in the Authorization header
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to update a post (ID in the URL)
export const _update = async (endpoint, id, postData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${BASE_URL}${endpoint}/${id}`, // Correct URL structure
      postData, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is sent correctly
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};



// Function to delete a post by ID (ID in the URL)
export const _delete = async (endpoint, id) => {
  try {
    const token = getAuthToken();
    await axios.delete(`${BASE_URL}${endpoint}/${id}`, { // ID is appended to the URL
      headers: {
        Authorization: `Bearer ${token}`, // Adding the token in the Authorization header
      },
    });
    return true;
  } catch (error) {
    handleApiError(error);
  }
};

"use client";
const axios = require("axios");

// Function to handle API errors
const handleApiError = (error) => {
  console.error("API Error:", error);
  throw new Error("An error occurred while communicating with the API");
};

export const BASE_URL = "http://localhost:8000";



// Function to retrieve all posts
export const _getAll = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to create a new post
export const _create = async (endpoint, postData) => {
  try {
    console.log("Sending request to:", `${BASE_URL}/${endpoint}`);
    const response = await axios.post(`${BASE_URL}${endpoint}`, postData);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const _createlogin = async (endpoint, postData) => {
  try {
    console.log("Sending request to:", `${BASE_URL}/${endpoint}`);
    const response = await axios.post(`${BASE_URL}${endpoint}`, postData);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to retrieve a single post by ID
export const _getById = async (endpoint, id) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to update a post
export const _update = async (endpoint, id, postData) => {
  console.log(postData);

  try {
    const response = await axios.put(
      `${BASE_URL}${endpoint}`,
      {
        id,
        ...postData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to delete a post by ID
export const _delete = async (endpoint, id) => {
  try {
    await axios.delete(`${BASE_URL}${endpoint}`, { data: { id } });
    return true;
  } catch (error) {
    handleApiError(error);
  }
};

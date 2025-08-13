import axios from 'axios';

// Get the base URL from environment variables
const API_BASE_URL = process.env.API_BASE_URL;

// Construct the full API URL
const API_URL = `${API_BASE_URL}/api/files`;

export const uploadFile = async (formData) => {
  try {
    // The endpoint here is just '/upload' because API_URL already includes '/api/files'
    const response = await axios.post(`${API_URL}/upload`, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getFileInfo = async (uuid) => {
  try {
    const response = await axios.get(`${API_URL}/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error getting file info:', error);
    throw error;
  }
};
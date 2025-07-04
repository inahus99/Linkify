import axios from 'axios';

const API_URL = 'http://localhost:8000/api/files'; // Your backend URL

export const uploadFile = async (formData) => {
  try {
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
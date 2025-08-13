import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

const FILES_API_URL = `${API_BASE_URL}/api/files`;

export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${FILES_API_URL}/upload`, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
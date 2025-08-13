import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;


const FILES_API_URL = `${API_BASE_URL}/api/files`;

/**
 * Uploads a file to the backend.
 * @param {FormData} formData - The form data containing the file.
 * @returns {Promise<object>} The server's response data.
 */
export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${FILES_API_URL}/upload`, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Retrieves file information using its UUID.
 * @param {string} uuid - The unique identifier for the file.
 * @returns {Promise<object>} The file's information.
 */
export const getFileInfo = async (uuid) => {
  try {
    const response = await axios.get(`${FILES_API_URL}/${uuid}`);
    return response.data;
  } catch (error)
  {
    console.error('Error getting file info:', error);
    throw error;
  }
};
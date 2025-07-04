import React, { useState, useRef } from 'react';
import Card from '../components/Card.jsx'; // Import our custom Card
import { uploadFile } from '../services/api.js'; // Import our API service

function HomePage() {
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // A ref to trigger the hidden file input
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileLink('');
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadFile(formData);
      setFileLink(response.file);
      setFile(null); // Clear the file after successful upload
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-gray-800">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Share anything with a link
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        The simplest way to share files. Upload your file, get a link, and share it.
      </p>

      <Card>
        {/* We use conditional rendering to show either the upload form or the success link */}
        {fileLink ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold">✅ Upload Successful!</h2>
            <p className="text-sm text-gray-500">Copy the link below and share it.</p>
            <div className="flex w-full">
              <input 
                type="text" 
                value={fileLink} 
                readOnly 
                className="flex-grow p-2 border border-gray-300 rounded-l-md bg-gray-50 focus:outline-none"
              />
              <button 
                onClick={() => navigator.clipboard.writeText(fileLink)}
                className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setFileLink('')}
              className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Upload Another File
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {/* The hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
            />
            {/* The custom button that triggers the hidden input */}
            <button 
              onClick={() => fileInputRef.current.click()}
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500"
            >
              {file ? `Selected: ${file.name}` : "Click to choose a file"}
            </button>

            {/* The main upload button */}
            <button 
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Share & Get Link"}
            </button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}
      </Card>
    </div>
  );
}

export default HomePage;
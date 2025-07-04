import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFileInfo } from '../services/api';

function DownloadPage() {
  const { uuid } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFileInfo = async () => {
      try {
        const info = await getFileInfo(uuid);
        setFileInfo(info);
      } catch (err) {
        setError('Could not find file. The link may have expired or is invalid.');
      }
    };
    fetchFileInfo();
  }, [uuid]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-gray-800">
      <Card>
        <h2 className="text-2xl font-bold mb-2 text-center">Ready to Download</h2>
        <p className="text-gray-500 mb-6 text-center">The file is ready to be saved to your device.</p>

        {error ? (
          <p className="text-lg text-red-500 font-semibold">{error}</p>
        ) : !fileInfo ? (
          <p className="text-lg">Loading file information...</p>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border rounded-lg text-center">
              <p className="font-semibold text-xl break-all">{fileInfo.fileName}</p>
              <p className="text-sm text-gray-600 mt-1">
                {(fileInfo.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {/* This is an <a> tag styled like a button for direct download */}
            <a 
              href={`http://localhost:8000/api/files/download/${fileInfo.uuid}`}
              className="block w-full text-center p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              download
            >
              Download File
            </a>
          </div>
        )}
      </Card>
    </div>
  );
}

// We can reuse our Card component here as well for consistency
function Card({ children }) {
    return (
        <div className="bg-white text-black rounded-xl border border-gray-200 p-8 shadow-lg w-full max-w-md">
            {children}
        </div>
    )
}

export default DownloadPage;
import multer from 'multer';
import path from 'path';
import File from '../models/fileModel.js';
import { fileURLToPath } from 'url';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 }, // 100MB limit
}).single('file'); // 'file' is the field name in the form-data

// Controller to upload a file
export const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'File not provided.' });
    }

    const file = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    const savedFile = await file.save();

    // Respond with the link to the download page
    const fileLink = `${process.env.APP_BASE_URL}/files/${savedFile.uuid}`;
    res.status(200).json({ file: fileLink });
  });
};

// Controller to get file details for download page
export const getFile = async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if(!file) {
            return res.status(404).json({ error: 'Link expired or file not found.'});
        }
        res.status(200).json({
            uuid: file.uuid,
            fileName: file.originalName,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    } catch(err) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};
// Add this new function
export const downloadFile = async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.status(404).json({ error: 'Link expired or file not found.' });
    }

    // res.download() is a special Express method that finds the file
    // and triggers a download prompt in the user's browser.
    res.download(file.path, file.originalName);

  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};
import express from 'express';
// Import downloadFile here
import { uploadFile, getFile, downloadFile } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', uploadFile);
router.get('/:uuid', getFile);
// new route for handling downloads
router.get('/download/:uuid', downloadFile);

export default router;
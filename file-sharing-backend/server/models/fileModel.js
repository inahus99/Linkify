import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  uuid: { type: String, default: () => uuidv4(), required: true },
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

export default File;
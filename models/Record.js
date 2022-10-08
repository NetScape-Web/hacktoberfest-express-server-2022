import mongoose from "mongoose";

// Defining Schema
const recordSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  imei: { type: String, required: false, trim: true },
  fir: { type: String, required: false, trim: true },
  description: { type: String, required: false, trim: true },
  chassNumber: { type: String, required: false, trim: true },
  engilneNumber: { type: String },
});

// Model
const RecordModel = mongoose.model("Record", recordSchema);

export default RecordModel;

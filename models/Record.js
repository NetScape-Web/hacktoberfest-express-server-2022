import mongoose from "mongoose";

// Defining Schema
const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A record must have a name"],
    trim: true,
  },
  fatherName: {
    type: String,
    required: [true, "A record must have a fatherName"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "A record must have an address"],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, "A record must have a mobile"],
    trim: true,
  },
  imei: { type: String, required: false, trim: true },
  fir: { type: String, required: false, trim: true },
  description: { type: String, required: false, trim: true },
  chassNumber: { type: String, required: false, trim: true },
  engilneNumber: { type: String },
});

// Model
const RecordModel = mongoose.model("Record", recordSchema);

export default RecordModel;

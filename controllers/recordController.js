import RecordModel from "../models/Record.js";

const createRecord = async (req, res) => {
  console.log(req.body);
  const {
    name,
    fatherName,
    address,
    mobile,
    imei,
    fir,
    description,
    chassNumber,
    engilneNumber,
  } = req.body;
  if (name && fatherName && address && mobile) {
    try {
      const doc = new RecordModel({
        name: name,
        fatherName: fatherName,
        address: address,
        mobile: mobile,
      });
      const saved = await doc.save();
      console.log("saved ", saved);
      res.status(201).send({
        status: "success",
        message: "Record Created",
        record: saved,
      });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Register" });
    }
  } else {
    res.send({ status: "failed", message: "All fields are required" });
  }
};
const getAllRecord = async (req, res) => {
  const allRecord = await RecordModel.find();
  console.log(allRecord);
  if (allRecord) {
    res.send({ status: "success", records: allRecord });
  } else res.send({ status: "failed", message: "No Record Found" });
};
export { createRecord, getAllRecord };

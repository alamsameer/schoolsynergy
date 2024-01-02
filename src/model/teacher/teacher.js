import mongoose, { Schema } from "mongoose";

const TeacherSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Example regex for basic email validation
  },
  password: { type: String, required: true },
  profile: {
    qualifications: { type: String },
    subjectsTaught: [{ type: String }],
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  orgid:{
    type: Schema.Types.ObjectId,
    ref: 'Organisation', // Reference to the Organisation model
  },
  organisationid: {
    type: Schema.Types.ObjectId,
    ref: 'Organisation', // Reference to the Organisation model
  },
  verificationStatus: {
    type: String,
    enum: ["pending", "verified"],
    default: "pending",
  },
    verificationDate: { type: Date },
    joinigDate: { type: Date },
  });

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;

import mongoose, { Schema } from "mongoose";

const TeacherSchema = new Schema({
  name: { type: String ,
    required: true,},
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Example regex for basic email validation
    },
  profile: {
    qualifications: { type: String },
    subjectsTaught: [{ type: String }],
  },
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Class',
  }],
  organization: {
    id: Schema.Types.ObjectId,
    verificationStatus: {
      type: String,
      enum: ["pending", "verified"],
      default: "pending",
    },
    verificationDate: { type: Date },
    joinigDate: { type: Date },
  },
});

const Teacher=mongoose.model("Teacher",TeacherSchema)

export default Teacher
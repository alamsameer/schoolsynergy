import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Example regex for basic email validation
  },
  password:{type:String,required:true},
  organizationId: {
    id: Schema.Types.ObjectId,
  },
  class:{type:Schema.Types.ObjectId,ref:"",required:true}
});

const Students=mongoose.model("Student",StudentSchema)
export default Students
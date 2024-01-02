import mongoose, { Schema } from "mongoose";
const ExamMarksSchema = new Schema({
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    organisationId:String,
    examId: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    marks: [{
      subject: {
        type: String,
        required: true,
      },
      marksObtained: {
        type: Number,
        required: true,
      },
    }],
  });
  
  const ExamMarks = mongoose.model('ExamMarks', ExamMarksSchema);
  export default ExamMarks
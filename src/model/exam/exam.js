import mongoose, { Schema } from "mongoose";

const ExamSchema = new Schema({
    examName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    organization: {
        id: Schema.Types.ObjectId,
      },
    subjects: [{
      type: String,
      required: true,
    }],
    associatedClasses: [{
      type: Schema.Types.ObjectId,
      ref: 'Class',
    }],
  });

  const exam=mongoose.model("Exams",ExamSchema)
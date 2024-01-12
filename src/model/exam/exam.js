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
    organisationId: {
        id: Schema.Types.ObjectId,
      },
    subjects: [{
      type: Schema.Types.ObjectId,
      required: true,
    }],
    associatedClasses: [{
      type: Schema.Types.ObjectId,
      ref: 'Class',
    }],
  });

  const exam=mongoose.model("Exams",ExamSchema)
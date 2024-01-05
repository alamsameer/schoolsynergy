import mongoose,{ Schema } from "mongoose";
const quizSchema = new Schema(
    {
      title: {
        type: String,
        minlength: 4,
        required: true,
      },
      subjectId:{
        type:Schema.Types.ObjectId,
        ref:"Subject",
        required:true
      },
      classId:{
        type:Schema.Types.ObjectId,
        ref:"Class",
        required:true
      },
      teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },
      questions: [
        {
          type: Schema.Types.ObjectId,
          ref: "Question",
        },
      ],
    },
    { timestamps: true }
  );
  
const quiz = mongoose.model("Quiz", quizSchema);

export default quiz
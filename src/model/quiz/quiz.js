import mongoose,{ Schema } from "mongoose";
const quizSchema = new Schema(
    {
      title: {
        type: String,
        minlength: 4,
        required: true,
      },
      teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
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
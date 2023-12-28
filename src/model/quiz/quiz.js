const quizSchema = new Schema(
    {
      title: {
        type: String,
        minlength: 4,
        required: true,
      },
      teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Teachers",
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
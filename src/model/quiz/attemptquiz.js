import mongoose,{ Schema } from "mongoose";
const attemptSchema = new Schema(
	{
		quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
		studentId: { type: Schema.Types.ObjectId, ref: "Student" },
		organisationId:{type:Schema.Types.ObjectId,ref:"Organisation"},
		questions: [
			{
				questionId: { type: Schema.Types.ObjectId, ref: "Question" },
				answers: [],
				isCorrect: { type: Boolean, default: false },
			},
		],
		totalScore: { type: number }
	},
	{ timestamps: true }
);

const Attempt=mongoose.model("Attempt", attemptSchema);
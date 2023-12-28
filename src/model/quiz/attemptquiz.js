import mongoose,{ Schema } from "mongoose";
const attemptSchema = new Schema(
	{
		quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
		playerId: { type: Schema.Types.ObjectId, ref: "User" },
		questions: [
			{
				questionId: { type: Schema.Types.ObjectId, ref: "Question" },
				answers: [],
				isCorrect: { type: Boolean, default: false },
				// score: { type: number }
			},
		],
		// totalScore: { type: number }
	},
	{ timestamps: true }
);

const Attempt=mongoose.model("Attempt", attemptSchema);
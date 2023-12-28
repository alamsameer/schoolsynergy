import { Schema } from "mongoose";

const questionSchema = new Schema(
	{
		quizId: {
			type: Schema.Types.ObjectId,
			ref: "Quiz",
		},
		teacherId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		answers: [
			{
				type: String,
				required: true,
			},
		],
		options: [
			{
				type: String,
				required: true,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
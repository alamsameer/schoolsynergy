import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
	{
		quizId: {
			type: Schema.Types.ObjectId,
			ref: "Quiz",
		},
		organisationId: {
			type: Schema.Types.ObjectId,
			ref: "Organisation",
			required: true,
		},
		teacherId: {
			type: Schema.Types.ObjectId,
			ref: "Teacher",
			required:true
		},
		question: {
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
export default mongoose.model("Question", questionSchema);
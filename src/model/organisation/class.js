import mongoose from "mongoose";

const classSchema = new Schema({
    className: {
      type: String,
      required: true,
    },
    organisation: {
        id: Schema.Types.ObjectId,
      },
  });

const Classes=mongoose.model("Class",classSchema)
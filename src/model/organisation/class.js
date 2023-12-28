import mongoose from "mongoose";

const classSchema = new Schema({
    className: {
      type: String,
      required: true,
    },
    organization: {
        id: Schema.Types.ObjectId,
      },
  });

const Classes=mongoose.model("Classes",classSchema)
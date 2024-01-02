import mongoose, { Schema } from "mongoose";

const orgSchema=new Schema(
    {
        name:{type:String,required:true},
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Example regex for basic email validation
          },
        password:{type:String,required:true},
        teacher:[{type:Schema.Types.ObjectId}],
        // verificationRequest:[{teacher:Schema.Types.ObjectId,ref:'Teacher'}],
        classes: [{
            type: Schema.Types.ObjectId,
            ref: 'Class',
          }],
    }
)

const Organisation=mongoose.model("Organisation",orgSchema)

export default Organisation
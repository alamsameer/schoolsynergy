import mongoose,{Schema} from "mongoose";

const classSchema =new Schema({
    name: String,
    classTeacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    organisationId:mongoose.Types.ObjectId,
    subjectTeacher:[{teacher:{type:Schema.Types.ObjectId, ref:"Teacher"},subject:{type:Schema.Types.ObjectId,ref:"Subject"}}]
})

const classes =  mongoose.model("class",classSchema)

export default classes
import mongoose,{Schema} from "mongoose";

const subjectSchema=new Schema({
    subject:String,
})

const Subject=mongoose.model("Subject",subjectSchema)

export default Subject
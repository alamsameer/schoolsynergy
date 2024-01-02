import TeacherModel from "../../model/teacher/teacher.js"
import ClassModel from "../../model/class/class.js"
import quizModel from "../../model/quiz/quiz.js"


export  const verifyTeacherByOrganisationId = async (req,res) => {
    const {teacherId, organisationId}=req.body
    try {
        const teacher = await TeacherModel.findOneAndUpdate(
            { _id: teacherId, organisationId },
            { verificationStatus: "verified", verifyDate: new Date() },
            { new: true }
        );
       res.status(201).json({message:"Teacher Verified",teacher})
    } catch (error) {
        throw new Error("Failed to verify teacher by organisation ID");
    }
};

export  const listTeachersByOrganisationId = async (req,res) => {
    const {organisationId}=req.body
    try {
        const teachers = await TeacherModel.find({ organisationId });
        return teachers;
    } catch (error) {
        throw new Error("Failed to list teachers by organisation ID");
    }
};

// assign classes-subject to the teacher

export const assignSubjectToTeacher=async (req,res)=>{
    const {teacherId,subjectId,classId,organisationId}=req.body;
    try{
        const existingAssociation = await ClassModel.findOne({
            _id: classId,
            organisationId:organisationId,
            'subjectTeacher.subject': subjectId,
            'subjectTeacher.teacher': teacherId,
          });
        if(!existingAssociation){

            const orgclass= await ClassModel.findOneAndUpdate({id:classId,organisationId:organisationId},
                {$push:{"subjects":{teacher:teacherId,subject:subjectId}}})
            res.status(201).json({message:"Subject assigned to teacher",orgclass})
        }
        res.status(409).json({ message: 'teacher and subject already exists.' });

    }
    catch(error){
        res.status(500).json({message:"server error"})
    }

}

// appoint classTeacher
export const appointClassTeacher=async(req,res)=>{
    const {teacherId,classId,organisationId}=req.body;
    try{
        await  ClassModel.findOneAndUpdate({
            _id:classId,
            organisationId:organisationId
        },{classTeacher:teacherId})
    }catch(error){
        res.status(500).json({message:"server error"})
    }
}

// remove classTeacher
export const removeClassTeacher=async(req,res)=>{
    const {teacherId,classId,organisationId}=req.body;
    try{
        await  ClassModel.findOneAndUpdate({
            _id:classId,
            organisationId:organisationId
        },{classTeacher:null})
    }catch(error){
        res.status(500).json({message:"server error"})
    }
}

// list all quizzes by the teacher

export const listQuizByTeacher=async (req,res)=>{
    const {teacherId}=req.body
    try{
        const quizzes=await quizModel.find({teacherId})
        res.status(200).json({message:"List of Quizzes by teacher",quizzes})
    }catch(error){
        res.status(500).json({message:"server error"})
    }
}

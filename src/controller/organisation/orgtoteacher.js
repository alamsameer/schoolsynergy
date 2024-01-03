import TeacherModel from "../../model/teacher/teacher.js"
import ClassModel from "../../model/class/class.js"
import quizModel from "../../model/quiz/quiz.js"
import Organisation from "../../model/organisation/organisation.js";


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
        res.status(500).json({message:"server error"})

    }
};

export  const listTeachersByOrganisationId = async (req,res) => {
    const {organisationId}=req.body
    try {
        const teachers = await TeacherModel.find({ organisationId });
        res.status(200).json(teachers)
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
};
export const addClassToOrg=async(req,res)=>{
    const {organisationId,classToAdd}=req.body;
    try{
        const isClass= await ClassModel.findOne({name:classToAdd,organisationId})

        if(!isClass){
            const createdClass=await ClassModel.create({name:classToAdd,organisationId})
            const classId=createdClass._id
            const organisation=await Organisation.findOneAndUpdate({_id:organisationId},{$push:{"classes":classId}},{new:true})
           return  res.status(201).json({message:"class created",organisation})
        }
        res.status(409).json({message:"class alredy can't create same class twice "})
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:"server error"})
    }

}

// get all class
export const getAllClassOfOrganisation=async(req,res)=>{
    const {organisationId}=req.body;
    try{
        const getAllClass= await ClassModel.find({organisationId})
        console.log("getAllClass.length()",getAllClass.length,getAllClass.length < 1);
        if(getAllClass.length < 1){
           return res.status(404).json({message:"you have not created any class"})
        }
        res.status(200).json({
            message:"List of classes belongto your organisation",
            getAllClass
        })
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"server error"})

    }

}
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
           return  res.status(201).json({message:"Subject assigned to teacher",orgclass})
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

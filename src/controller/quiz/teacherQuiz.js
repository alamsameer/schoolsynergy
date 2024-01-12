
// it is to handle quiz by teacher
// create quiz
import questionModel from "../../model/quiz/question.js";
import quizModel from "../../model/quiz/quiz.js";

// creating quiz by teacher 
export const createQuiz = async (req, res) => {
    const { title, teacherId, subjectId,classId} = req.body;
    try {
        const isQuiz=await quizModel.find({title,subjectId,teacherId,classId})
        console.log(isQuiz);
        if(isQuiz.length>0){
            return res.status(200).json({message:"quiz already exist wiht the same name"})
        }
        const quiz = await quizModel.create({title, teacherId,subjectId,classId});
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// add questions to quiz
export const addQuestionToQuizById=async (req,res)=>{
    const {quizId,teacherId,questiontoAdd,answers,options,subjectId,organisationId}=req.body;
    try{
        const question=await questionModel.create({quizId,teacherId,question:questiontoAdd,answers,options,subjectId,organisationId})
        const updatedQuiz=await quizModel.findOneAndUpdate({_id:quizId},{$push:{questions:question}},{new:true}).populate('questions')
        res.status(201).json({message:"question added to quiz",updatedQuiz})
        
    }catch(error){
        console.log("error: ",error.message);
        res.status(500).json({message:"server error"})
    }
}
// delete question from quiz
export const deleteQuestionFromQuizById=async (req,res)=>{
    const {quizId,questionId}=req.body;
    try{
        await questionModel.findByIdAndDelete(questionId);
        const updatedQuiz=await quizModel.findOneAndUpdate({_id:quizId},{$pull:{questions:questionId}})
        res.status(204).json({message:"question deleted from quiz",updatedQuiz})
    }catch(error){
        res.status(500).json({message:"server error"})
    }
}

// update quiz name
export const updateQuizNameById = async (req, res) => {
    const { quizId, newTitle } = req.body;
    try {
        const updatedQuiz = await quizModel.findByIdAndUpdate(quizId, { title: newTitle }, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// get quiz by id
export const getQuizById = async (req, res) => {
    const { quizId } = req.params;
    try {
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// get quiz by teacher id
export const getQuizByTeacherId = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const quizzes = await quizModel.find({ teacherId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get quiz by subject id
export const getQuizBySubjectId = async (req, res) => {
    const { subjectId } = req.params;
    try {
        const quizzes = await quizModel.find({ subjectId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get quiz by class id
export const getQuizByClassId = async (req, res) => {
    const { classId } = req.params;
    try {
        const quizzes = await quizModel.find({ classId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get quiz by teacher id and subject id
export const getQuizByTeacherIdAndSubjectId = async (req, res) => {
    const { teacherId, subjectId } = req.params;
    try {
        const quizzes = await quizModel.find({ teacherId, subjectId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get quiz by teacher id and class id
export const getQuizByTeacherIdAndClassId = async (req, res) => {
    const { teacherId, classId } = req.params;
    try {
        const quizzes = await quizModel.find({ teacherId, classId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get quiz by subject id and class id
export const getQuizBySubjectIdAndClassId = async (req, res) => {
    const { subjectId, classId } = req.params;
    try {
        const quizzes = await quizModel.find({ subjectId, classId }).populate("questions");
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get quiz by teacher id, subject id and class id
export const getQuizByTeacherIdAndSubjectIdAndClassId = async (req, res) => {
    const { teacherId, subjectId, classId } = req.params;
    try {
        const quizzes = await quizModel.find({ teacherId, subjectId, classId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



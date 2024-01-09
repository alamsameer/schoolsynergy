import express from 'express';
const router = express.Router();
import {
  createQuiz,
  addQuestionToQuizById,
  deleteQuestionFromQuizById,
  updateQuizNameById,
  getQuizById,
  getQuizByTeacherId,
  getQuizBySubjectId,
  getQuizByClassId,
  getQuizByTeacherIdAndSubjectId,
  getQuizByTeacherIdAndClassId,
  getQuizBySubjectIdAndClassId,
  getQuizByTeacherIdAndSubjectIdAndClassId,
} from  '../controller/quiz/teacherQuiz.js';

// Creating quiz by teacher
router.post('/create', createQuiz);

// Add question to quiz by ID
router.post('/add-question', addQuestionToQuizById);

// Delete question from quiz by ID
router.delete('/delete-question', deleteQuestionFromQuizById);

// Update quiz name by ID
router.put('/update-name', updateQuizNameById);
 
// Get quiz by ID
router.get('/:quizId', getQuizById);

// Get quizzes by teacher ID
router.get('/get-by-teacher/:teacherId', getQuizByTeacherId);

// Get quizzes by subject ID
router.get('/get-by-subject/:subjectId', getQuizBySubjectId);

// Get quizzes by class ID
router.get('/get-by-class/:classId', getQuizByClassId);

// Get quizzes by teacher ID and subject ID
router.get('/get-by-teacher-subject/:teacherId/:subjectId', getQuizByTeacherIdAndSubjectId);

// Get quizzes by teacher ID and class ID
router.get('/get-by-teacher-class/:teacherId/:classId', getQuizByTeacherIdAndClassId);

// Get quizzes by subject ID and class ID
router.get('/get-by-subject-class/:subjectId/:classId', getQuizBySubjectIdAndClassId);

// Get quizzes by teacher ID, subject ID, and class ID
router.get('/get-by-teacher-subject-class/:teacherId/:subjectId/:classId', getQuizByTeacherIdAndSubjectIdAndClassId);

export default router;

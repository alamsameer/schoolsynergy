import { Router } from "express";
import { StudentSignIn,StudentSignUp } from "../controller/auth/student.js";
import { studentAttempt } from "../controller/quiz/attemptedQuiz.js";
const router = Router();

router.post("/signup",StudentSignUp)
router.post("/signin",StudentSignIn)
router.post("/attempt", studentAttempt);

export default router

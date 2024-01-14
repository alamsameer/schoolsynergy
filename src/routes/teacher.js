import { Router } from "express";
import { TeacherSignIn,TeacherSignUp } from "../controller/auth/teacher.js";
import {authenticateTeacher} from "../middleware/auth/authenticate.js"
import { updateSubjectMarksByTeacher } from "../controller/exam/exam.js"; 
const route=Router()

route.post("/signup",TeacherSignUp)

route.post("/signin",TeacherSignIn)

// update exam marks 
route.post("/update-marks",updateSubjectMarksByTeacher)

export default route;
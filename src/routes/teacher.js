import { Router } from "express";
import { TeacherSignIn,TeacherSignUp } from "../controller/auth/teacher.js";
import {authenticateTeacher} from "../middleware/auth/authenticate.js"
const route=Router()

route.post("/signup",TeacherSignUp)
route.post("/signin",TeacherSignIn)

export default route;
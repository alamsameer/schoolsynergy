import { Router } from "express";
import { TeacherSignIn,TeacherSignUp ,AddSubjectToTeacher,getAllTeachersWithOrganization} from "../controller/auth/teacher.js";
import {authenticateTeacher} from "../middleware/auth/authenticate.js"
const route=Router()

route.post("/signup",TeacherSignUp)
route.post("/signin",TeacherSignIn)
route.post("/add-subject",authenticateTeacher,AddSubjectToTeacher)
route.get("/teachers",getAllTeachersWithOrganization)

export default route;
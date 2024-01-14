import { Router } from "express";
import {
  OrganisationSignUp,
  OrganisationSignIn,
} from "../controller/auth/organisation.js";
import {
  verifyTeacherByOrganisationId,
  listTeachersByOrganisationId,
  assignSubjectToTeacher,
  appointClassTeacher,
  removeClassTeacher,
  listQuizByTeacher,
  addClassToOrg,
  getAllClassOfOrganisation
} from "../controller/organisation/orgtoteacher.js";

import { createExam } from "../controller/exam/exam.js";

const route = Router();

route.post("/signup", OrganisationSignUp);
route.post("/signin", OrganisationSignIn);

// Verify Teacher by Organisation ID
route.post("/verify-teacher", verifyTeacherByOrganisationId);

// List Teachers by Organisation ID
route.get("/list-teachers", listTeachersByOrganisationId);

// add class to  organisation

route.post("/add-class",addClassToOrg)

// get all class that belong to  organisation

route.get("/classes",getAllClassOfOrganisation)

// Assign Subject to Teacher
route.post("/assign-subject", assignSubjectToTeacher);

// Appoint Class Teacher
route.post("/appoint-class-teacher", appointClassTeacher);

// Remove Class Teacher
route.post("/remove-class-teacher", removeClassTeacher);

// List Quizzes by Teacher
route.post("/list-quiz-by-teacher", listQuizByTeacher);

// create exam 
route.post("/create-exam",createExam)


export default route;

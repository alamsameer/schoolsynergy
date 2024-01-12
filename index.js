
import dbmain from "./src/config/db.js"
import express from "express";
import bodyParser from "body-parser";
import OrganisationRoutes from "./src/routes/organisation.js";
import TeacherRoutes from  "./src/routes/teacher.js"
import QuizRoutes from "./src/routes/quiz.js"
import StudentRoutes from "./src/routes/student.js"
const app =express();

dbmain().then(()=>{ console.log("db connected");}).catch((e)=>{ console.log(e);console.log("db not connected");})

// Use body-parser middleware to parse JSON in the request body
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/organisation",OrganisationRoutes);
app.use("/api/teacher",TeacherRoutes)
app.use('/api/quiz', QuizRoutes);
app.use('/api/student',StudentRoutes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default  app
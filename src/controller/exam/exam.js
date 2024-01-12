import ExamModel from "../../model/exam/exam.js"
import TeacherModel from "../../model/teacher/teacher.js"
import ClassModel from "../../model/class/class.js"


// create exam by organisation
const createExam = async (req, res) => {
    try {
        const { examName, date, organisationId, subjects, associatedClasses } = req.body;

        if (!examName || !date || !organisationId || !subjects || !associatedClasses) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const createdExam = await ExamModel.create({ examName, date, organisationId, subjects, associatedClasses });

        res.status(200).json({ message: "exam created", createdExam });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


export const updateMarks = async () => {
    try {
      // Find the ExamMarks document
      const examMarks = await ExamMarks.findOne({
        studentId: studentIdToUpdate,
        organisationId: organisationIdToUpdate,
        examId: examIdToUpdate,
      });
  
      if (examMarks) {
        // Check if the subject already has marks, update it; otherwise, add a new entry
        const existingSubjectIndex = examMarks.marks.findIndex(
          (entry) => entry.subject === subjectToUpdate
        );
  
        if (existingSubjectIndex !== -1) {
          // Update existing entry
          examMarks.marks[existingSubjectIndex].marksObtained = marksObtainedToUpdate;
        } else {
          // Add a new entry
          examMarks.marks.push({
            subject: subjectToUpdate,
            marksObtained: marksObtainedToUpdate,
          });
        }
  
        // Save the updated ExamMarks document
        await examMarks.save();
  
        console.log("Marks updated successfully.");
      } else {
        console.log("ExamMarks document not found.");
      }
    } catch (error) {
      console.error("Error updating exam marks:", error);
    }
  };
const updateSubjectMarksByTeacher = async (req, res) => {
    try {
        const { teacherId, marks, subjectId, classId ,studentId} = req.body;
        const getClass = await ClassModel.find({ _id: classId });
        const subjectTeacher = getClass.subjectTeacher;
        const isTeachingSubject = subjectTeacher.some(
            (entry) =>
                entry.teacher.toString() === teacherId &&
                entry.subject.toString() === subjectId
        );

        // Check if the teacher has access to the subject
        if (!isTeachingSubject) {
            return res.status(401).json({ error: 'Unauthorized to change the subjects marks' });
        }

        // Check if the student exists
        // ...

        // Update marks
        // ...
        
        res.status(200).json({ message: "Marks updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

  
// get exam marks for the students - examwise 

   
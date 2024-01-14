import { isValidObjectId } from "mongoose";
import ExamModel from "../../model/exam/exam.js";
import TeacherModel from "../../model/teacher/teacher.js";
import ClassModel from "../../model/class/class.js";
import ExamMarksModel from "../../model/exam/examMarks.js";

// create exam by organisation
export const createExam = async (req, res) => {
  try {
    const { examName, date, organisationId, subjects, associatedClasses } =
      req.body;

    if (
      !examName ||
      !date ||
      !organisationId ||
      !subjects ||
      !associatedClasses
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const createdExam = await ExamModel.create({
      examName,
      date,
      organisationId,
      subjects,
      associatedClasses,
    });

    res.status(200).json({ message: "exam created", createdExam });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// for teacher to update the marks

const updateMarks = async (
  studentId,
  organisationId,
  examId,
  subjectId,
  marksObtainedToUpdate
) => {
  try {
    // Validate ObjectId parameters
    if (
      !isValidObjectId(studentId) ||
      !isValidObjectId(organisationId) ||
      !isValidObjectId(examId) ||
      !isValidObjectId(subjectId)
    ) {
      throw new Error("Invalid ObjectId provided.");
    }

    // Find the ExamMarks document
    let examMarks = await ExamMarksModel.findOne({
      studentId,
      organisationId,
      examId,
    });

    if (!examMarks) {
      // If ExamMarks document not found, create a new one
      examMarks = await ExamMarksModel.create(
        {
          studentId: studentId,
          organisationId: organisationId,
          examId: examId,
          marks: [
            {
              subject: subjectId, // Assuming subjectId is the ObjectId for the subject
              marksObtained: marksObtainedToUpdate,
            },
          ],
        },
        { new: true }
      );
    }

    // Check if the subject already has marks
    const existingSubjectIndex = examMarks.marks.findIndex((entry) =>
      entry.subject.equals(subjectId)
    );

    if (existingSubjectIndex == -1) {
      // Add a new entry
      examMarks.marks.push({
        subject: subjectId,
        marksObtained: marksObtainedToUpdate,
      });
      console.log("Marks updated successfully.");
    }else{
      console.log("subject already there");
    }
    // Save the updated ExamMarks document
    await examMarks.save();
    return examMarks;
  } catch (error) {
    console.error("Error updating exam marks:", error);
    return null;
  }
};
export const updateSubjectMarksByTeacher = async (req, res) => {
  try {
    const {
      teacherId,
      marks,
      subjectId,
      classId,
      studentId,
      organisationId,
      examId,
    } = req.body;
    const getClass = await ClassModel.find({ _id: classId });

    if (getClass.length > 0) {
      // Parse the subjectTeacher string to an object
      const subjectTeachers = getClass[0].subjectTeacher;
      subjectTeachers.forEach((st) => {
        console.log("st", st);
        const teacherId = st.teacher;
        const subjectId = st.subject;

        console.log("Teacher ID:", teacherId);
        console.log("Subject ID:", subjectId);
      });
      const isTeachingSubject = subjectTeachers.some(
        (entry) =>
          entry.teacher.toString() === teacherId &&
          entry.subject.toString() === subjectId
      );

      // Check if the teacher has access to the subject
      if (!isTeachingSubject) {
        return res
          .status(401)
          .json({ error: "Unauthorized to change the subjects marks" });
      }
    } else {
      console.log("Class not found");
    }
    const studentMarks = updateMarks(
      studentId,
      organisationId,
      examId,
      subjectId,
      marks
    );
    if (studentMarks) {
      return res.status(200).json({ message: "Marks updated successfully" });
    }
    res.status(404).json({ message: "student not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get exam marks for the students - examwise

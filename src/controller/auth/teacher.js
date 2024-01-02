import bcrypt from "bcrypt";
import Teacher from "../../model/teacher/teacher.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const TeacherSignUp = async (req, res) => {
  try {
    const { name, email, password, subjects, OrganisationId } = req.body;
    console.log({ name, email, password, subjects, OrganisationId });
    // Check if the user already exists
    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Teacher already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const id =new mongoose.Types.ObjectId(OrganisationId);
    console.log("id ",id);
    // Create a new user object
    const newUser = {
      name,
      email,
      password: hashedPassword,
      profile: { subjectsTaught: subjects },
      organisationid:id
    };

    // Add the user to the databaseJJ
    const newTeacherData = await Teacher.create(newUser);

    console.log(newTeacherData);
    const role = "teacher";
    // Generate a JWT token
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Return the token to the client
    res.status(201).json({ message: "Teacher registered successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
};

export const TeacherSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    const  teacher= await Teacher.findOne({ email });
    console.log(teacher);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, teacher.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const role = "organisation";
    // Generate a JWT token
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Return the token to the client
    res.json({ message: "Teacher logged in successfully", token, teacher });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error logging in user" });
  }
};


export const getAllTeachersWithOrganization = async (req, res) => {
  try {
    // Use Mongoose populate to get all teachers with organization details
    const teachers = await Teacher.find().populate('organizationid');

    // Respond with the list of teachers
    res.status(200).json({ teachers });
  } catch (error) {
    // Handle errors, e.g., database error, etc.
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getAllTeachersWithOrganization;

export const AddSubjectToTeacher = async (req, res) => {
  try {
    const { email, subject } = req.body;
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { email },
      { $push: { "profile.subjectsTaught": subject } },
      { new: true }
    );
    if (!updatedTeacher) {
      res.status(404).json({ message: "Teacher does not exist" });
    }
    console.log(updatedTeacher);
    res.status(201).json(updatedTeacher);
  } catch (e) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

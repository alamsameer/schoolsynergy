import bcrypt from "bcrypt";
import Teacher from "../../model/teacher/teacher.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const TeacherSignUp = async (req, res) => {
  try {
    const { name, email, password, subjects, OrganisationId,qualifications } = req.body;
    console.log({ name, email, password, subjects, OrganisationId });
    // Check if the user already exists
    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Teacher already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user object
    const newUser = {
      name,
      email,
      password: hashedPassword,
      profile: { 
        qualifications:qualifications,
        subjectsTaught: subjects },
      organisationId:new mongoose.Types.ObjectId(OrganisationId)
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

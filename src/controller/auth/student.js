import bcrypt from 'bcrypt';
import Student from '../../model/student/student';
import jwt from "jsonwebtoken"

export const StudentSignUp=async (req, res) => {
    try {
      const { name, email, password, studentclass,OrganisationId} = req.body;
      console.log({ name, email, password,studentclass} );
      // Check if the user already exists
      const existingUser = await Student.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Student already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };
  
      // Add the user to the databaseJJ
      const newTeacherData = await Student.create(newUser);
      const role="student"
      // Generate a JWT token
      const token = jwt.sign({ email,role}, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Return the token to the client
      res.status(201).json({ message: 'Student registered successfully',token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error registering user' });
    }
  }

export const StudentSignIn=async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({  email, password} );
    const user = await Student.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const role="student"
    // Generate a JWT token
    const token = jwt.sign({ email,role}, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    // Return the token to the client
    res.json({ message: 'Student logged in successfully',token ,user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Error logging in user' });
  }
}

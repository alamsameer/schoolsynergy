import bcrypt from 'bcrypt';
import Teacher from '../../model/teacher/teacher';
import jwt from "jsonwebtoken"

export const OrganisationSignUp=async (req, res) => {
    try {
      const { name, email, password,subjects} = req.body;
      console.log({ name, email, password,subjects} );
      // Check if the user already exists
      const existingUser = await Teacher.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Teacher already exists' });
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
      const newTeacherData = await Teacher.create(newUser);
      const role="teacher"
      // Generate a JWT token
      const token = jwt.sign({ email,role}, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Return the token to the client
      res.status(201).json({ message: 'Teacher registered successfully',token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error registering user' });
    }
  }

export const OrganisationSignIn=async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({  email, password} );
    const user = await Teacher.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const role="organisation"
    // Generate a JWT token
    const token = jwt.sign({ email,role}, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    // Return the token to the client
    res.json({ message: 'Teacher logged in successfully',token ,user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Error logging in user' });
  }
}

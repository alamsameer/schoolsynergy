import dotenv from 'dotenv'
dotenv.config();
import jwt from "jsonwebtoken"

const secret=process.env.JWT_SECRET;


export const authenticateOrganisation = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
  
    // Check if the token is present
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token,secret); // Replace with your actual secret key
  
      // Attach the decoded user information to the request object for use in route handlers
      req.user = decoded;
     if(user.role!="organisation"){
      return res.status(401).json({ error: 'Unauthorized to access ' });
     }
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };

  export const authenticateTeacher = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
  
    // Check if the token is present
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token,secret); // Replace with your actual secret key
  
      // Attach the decoded user information to the request object for use in route handlers
      req.user = decoded;
      console.log("teacher decoded",decoded);
      if(user.role!="teacher"){
        return res.status(401).json({ error: 'Unauthorized to access ' });

      }
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };

  export const authenticateStudent = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
  
    // Check if the token is present
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token,secret); // Replace with your actual secret key
  
      // Attach the decoded user information to the request object for use in route handlers
      req.user = decoded;
      if(user.role!="student"){
        return res.status(401).json({ error: 'Unauthorized to access ' });
      }
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };

  export const authenticateParent = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
  
    // Check if the token is present
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token,secret); // Replace with your actual secret key
  
      // Attach the decoded user information to the request object for use in route handlers
      req.user = decoded;
     if(user.role!="parent"){
      return res.status(401).json({ error: 'Unauthorized to access ' });
     }
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };
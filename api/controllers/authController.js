const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { JWT_SECRET } = require('../config');
const Joi = require('joi');

/**
 * User Login
 * @param {res} req parameter request
 * @param {res} res response
 * @returns {object}
 */
const login = async (req, res) => {

    try {
    const { username, password } = req.body;

    const schema = Joi.object({
      username: Joi.string().alphanum().required().messages({
        'any.required': 'Please provide a username.',
        'string.empty': 'Username cannot be empty.',
        'string.alphanum': 'Username must only contain alphanumeric characters.',
      }),
      password: Joi.string().min(8).required().messages({
        'any.required': 'Please provide a password.',
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password must be at least 8 characters long.',
      }),
    });
    
    // Validate the username and password against the schema
    const { error, value } = schema.validate({ username, password });
    
    // Check for validation errors
    if (error) {
      // Return all validation error messages
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

      // Find the user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ msg: 'Invalid username or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ msg: 'Invalid username or password' });
      }
      // Create a JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '3d' });
  
      return res.status(200).json({ msg: 'Login successful', token, role: user.role });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ err: 'Error logging in' });
    }
}

/**
 * User Registration
 * @param {res} req parameter request
 * @param {res} res response
 * @returns {object}
 */

const register = async (req, res) => {

  try {
    
    const { username, password, role } = req.body;

    const schema = Joi.object({
      username: Joi.string().required().messages({
        'any.required': 'username name is required.',
        'string.empty': 'username name must not be empty.',
      }),
      password: Joi.string().required().messages({
        'any.required': 'password is required.',
        'string.empty': 'password must not be empty.',
      }),
      role: Joi.string().required().messages({
        'any.required': 'Address is required.',
        'string.empty': 'Address must not be empty.',
      })
    })

      // Validate the request body against the schema
      const { error, value } = schema.validate(req.body);
    
      // Check for validation errors
      if (error) {
         // Return the first validation error message
         const errorMessage = error.details[0].message;
        return res.status(400).json({ error: errorMessage });
      }
        
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ msg: 'Username already exists' });
      }
    
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);

      const user = await User.create({ username, password: hashedPassword, role });

      console.log(user);
      return res.status(200).json({msg: "User created"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({err: "Error registering user."});
  }
}

module.exports = {
    login,
    register
}
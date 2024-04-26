const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { JWT_SECRET } = require('../config');
const Joi = require('joi');

/**
 * User Login
 * @param {req} req parameter request
 * @param {res} res response
 * @returns {object}
 */
const login = async (req, res) => {

    try {
    const { username, password } = req.body;

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
 * @param {req} req parameter request
 * @param {res} res response
 * @returns {object}
 */

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
        
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ msg: 'Username already exists' });
      }
    
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);

      const user = await User.create({ username, password: hashedPassword, role });

      if(!user){
        return res.status(400).json({msg: "Failed to create user."});
      }

      console.log("User created.");
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
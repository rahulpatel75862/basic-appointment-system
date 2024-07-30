import { createUser, getUserByEmail, getAllUsers } from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  console.log('hello', name, email, phone, role, password)
  
  // Validate request body
  if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await createUser({ name, email, phone, role, password: hashedPassword });
  res.status(201).json({ userId });
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(201).json({token, message: "user login successfully"});
};

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
};


import db from '../config/db.js'

export const createUser = async (user) => {
  const { name, email, phone, role, password } = user;

  if (!name || !email || !phone || !role || !password) {
      throw new Error('All user fields must be defined');
  }

  try {
      const [result] = await db.execute(
          'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)', 
          [name, email, phone, role, password]
      );
      return result.insertId;
  } catch (error) {
      console.error('Database error:', error);
      throw error;
  }
};



export const getUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  };
  
  export const getAllUsers = async () => {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  };
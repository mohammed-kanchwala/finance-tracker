import db from '../db/database';
import bcrypt from 'bcryptjs';

export const registerUser = async (username: string, password: string): Promise<boolean> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  try {
    stmt.run(username, hashedPassword);
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

export const loginUser = async (username: string, password: string): Promise<{ id: number; username: string } | null> => {
  const stmt = db.prepare('SELECT id, username, password FROM users WHERE username = ?');
  const user = stmt.get(username);
  if (user && await bcrypt.compare(password, user.password)) {
    return { id: user.id, username: user.username };
  }
  return null;
};
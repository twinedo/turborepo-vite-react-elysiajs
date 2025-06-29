import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User } from "./types";
import { prisma } from "prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "portfolio-twinedo-jwt";
const SALT_ROUNDS = 10;

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  return await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const verifyToken = (token: string) => {
  if (!token) {
    throw new Error('No token provided')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { 
      id: string
      email: string
      role: string
      exp: number
    }

    // Check token expiration
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      throw new Error('Token expired')
    }

    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

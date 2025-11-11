import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";
import { generateToken } from "../utils/jwt.utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Please insert email and password",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please submit a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be atleast 8 characters",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "This email has been used before. Please try a new one",
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password_hash },
    });

    const token = generateToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Please enter email and password",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please enter valid email address",
      });
    }

    if (!user) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

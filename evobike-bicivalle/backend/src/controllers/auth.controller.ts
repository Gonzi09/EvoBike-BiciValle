import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';
import type { ApiError, ApiSuccess } from '../types/api.types.js';

interface AuthBody {
  email?: string;
  password?: string;
  name?: string;
  role?: UserRole;
}

interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const login = async (
  req: Request,
  res: Response<ApiSuccess<{ token: string; user: PublicUser }> | ApiError>
): Promise<Response<ApiSuccess<{ token: string; user: PublicUser }> | ApiError>> => {
  try {
    const body = req.body as AuthBody;

    if (!body.email || !body.password) {
      return res.status(400).json({
        success: false,
        error: 'Missing credentials',
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: {
        ...userSelect,
        password: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const passwordIsValid = await bcrypt.compare(body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
      }
    );

    const { password: _password, ...publicUser } = user;

    return res.json({
      success: true,
      data: {
        token,
        user: publicUser,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to login',
    });
  }
};

export const register = async (
  req: Request,
  res: Response<ApiSuccess<PublicUser> | ApiError>
): Promise<Response<ApiSuccess<PublicUser> | ApiError>> => {
  try {
    const body = req.body as AuthBody;

    if (!body.email || !body.password || !body.name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
      });
    }

    const role = body.role ?? UserRole.VENDOR;

    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role',
      });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        name: body.name,
        role,
      },
      select: userSelect,
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to register user',
    });
  }
};
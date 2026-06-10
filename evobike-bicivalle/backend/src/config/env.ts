import dotenv from 'dotenv';

dotenv.config();

const required = (name: string): string => {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 5001),
  DATABASE_URL: required('DATABASE_URL'),
  JWT_SECRET: required('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  SIIGO_USERNAME: required('SIIGO_USERNAME'),
  SIIGO_ACCESS_KEY: required('SIIGO_ACCESS_KEY'),
  SIIGO_PARTNER_ID: required('SIIGO_PARTNER_ID'),
  SIIGO_DOCUMENT_ID: Number(required('SIIGO_DOCUMENT_ID')),
  SIIGO_SELLER_ID: Number(required('SIIGO_SELLER_ID')),
  SIIGO_COST_CENTER_ID: Number(required('SIIGO_COST_CENTER_ID')),
  SIIGO_PAYMENT_TYPE_ID: Number(required('SIIGO_PAYMENT_TYPE_ID')),
  FRONTEND_URL: required('FRONTEND_URL'),
} as const;
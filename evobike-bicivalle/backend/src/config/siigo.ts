import { env } from './env.js';

export const SIIGO_BASE_URL = 'https://api.siigo.com';
export const SIIGO_AUTH_URL = `${SIIGO_BASE_URL}/auth`;

export const SIIGO_PARTNER_ID = env.SIIGO_PARTNER_ID;
export const SIIGO_DOCUMENT_ID = env.SIIGO_DOCUMENT_ID;
export const SIIGO_SELLER_ID = env.SIIGO_SELLER_ID;
export const SIIGO_COST_CENTER_ID = env.SIIGO_COST_CENTER_ID;
export const SIIGO_PAYMENT_TYPE_ID = env.SIIGO_PAYMENT_TYPE_ID;
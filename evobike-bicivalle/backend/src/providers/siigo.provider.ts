import axios from 'axios';
import { env } from '../config/env.js';
import {
  SIIGO_AUTH_URL,
  SIIGO_BASE_URL,
  SIIGO_PARTNER_ID,
} from '../config/siigo.js';
import type {
  CreateCustomerInput,
  CreateInvoiceInput,
  SiigoApiErrorPayload,
  SiigoCollectionResponse,
  SiigoCustomer,
  SiigoInvoice,
  SiigoProduct,
  SiigoProductsResponse,
} from '../types/siigo.types.js';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

export class SiigoProviderError extends Error {
  readonly statusCode: number;
  readonly code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.name = 'SiigoProviderError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

const extractError = (statusCode: number, payload: unknown): SiigoProviderError => {
  const errorPayload = payload as SiigoApiErrorPayload | undefined;
  const firstError = errorPayload?.Errors?.[0];
  const message = firstError
    ? `${firstError.Code}: ${firstError.Message}${firstError.Detail ? ` - ${firstError.Detail}` : ''}`
    : 'Siigo request failed';

  return new SiigoProviderError(message, errorPayload?.Status ?? statusCode, firstError?.Code);
};

const BASE_URL = SIIGO_BASE_URL;

export class SiigoProvider {
  async authenticate(): Promise<void> {
    const response = await axios.post(
      SIIGO_AUTH_URL,
      {
        username: env.SIIGO_USERNAME,
        access_key: env.SIIGO_ACCESS_KEY,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Partner-Id': SIIGO_PARTNER_ID,
        },
        validateStatus: () => true,
      }
    );

    if (response.status < 200 || response.status >= 300) {
      throw extractError(response.status, response.data);
    }

    const accessToken = response.data.access_token as string | undefined;

    if (!accessToken) {
      throw new Error('Siigo authentication succeeded without an access_token');
    }

    const expiresInSeconds = Number(response.data.expires_in ?? 86400);
    tokenCache = {
      accessToken,
      expiresAt: Date.now() + expiresInSeconds * 1000 - 5 * 60 * 1000,
    };
  }

  async getToken(): Promise<string> {
    if (!tokenCache || Date.now() > tokenCache.expiresAt) {
      await this.authenticate();
    }

    if (!tokenCache) {
      throw new Error('Siigo token cache is empty after authentication');
    }

    return tokenCache.accessToken;
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const maxRetries = 3;
    const delays = [1000, 2000, 4000];

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const token = await this.getToken();
      const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Partner-Id': env.SIIGO_PARTNER_ID,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (res.status === 429 && attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delays[attempt]));
        continue;
      }

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw extractError(res.status, errBody);
      }

      return res.json() as Promise<T>;
    }

    throw new Error('Max retries exceeded');
  }

  async getProducts(page = 1, pageSize = 25): Promise<SiigoProductsResponse> {
    return this.request<SiigoProductsResponse>('GET', `/v1/products?page=${page}&page_size=${pageSize}&active=true`);
  }

  async getAllProducts(): Promise<SiigoProduct[]> {
    const firstPage = await this.getProducts(1, 100);
    const allProducts = [...firstPage.results];
    const totalResults = firstPage.pagination.total_results;
    const totalPages = Math.max(1, Math.ceil(totalResults / firstPage.pagination.page_size));

    for (let page = 2; page <= totalPages; page += 1) {
      const response = await this.getProducts(page, 100);
      allProducts.push(...response.results);
    }

    return allProducts;
  }

  async getProductByCode(code: string): Promise<SiigoProduct | null> {
    const response = await this.request<SiigoProductsResponse>('GET', `/v1/products?code=${encodeURIComponent(code)}&active=true`);

    return response.results[0] ?? null;
  }

  async getProductById(id: string): Promise<SiigoProduct | null> {
    try {
      return await this.request<SiigoProduct>('GET', `/v1/products/${encodeURIComponent(id)}`);
    } catch (error) {
      if (error instanceof SiigoProviderError && error.statusCode === 404) {
        return null;
      }

      throw error;
    }
  }

  async findCustomerByIdentification(identification: string): Promise<SiigoCustomer | null> {
    const response = await this.request<SiigoCollectionResponse<SiigoCustomer>>('GET', `/v1/customers?identification=${encodeURIComponent(identification)}`);

    return response.results[0] ?? null;
  }

  async createCustomer(data: CreateCustomerInput): Promise<SiigoCustomer> {
    return this.request<SiigoCustomer>('POST', '/v1/customers', data);
  }

  async createInvoice(data: CreateInvoiceInput): Promise<SiigoInvoice> {
    return this.request<SiigoInvoice>('POST', '/v1/invoices', data);
  }
}

export const siigoProvider = new SiigoProvider();
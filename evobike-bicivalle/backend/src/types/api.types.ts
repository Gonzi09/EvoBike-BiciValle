export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
  total?: number;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}
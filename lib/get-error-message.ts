import axios from 'axios';

interface ApiError {
  message?: string;
  errors?: { message?: string }[];
}

export function getErrorMessage(
  error: unknown,
  fallback: string
): string {
  if (!axios.isAxiosError<ApiError>(error)) {
    return fallback;
  }

  return (
    error.response?.data?.errors?.[0]?.message ??
    error.response?.data?.message ??
    fallback
  );
}
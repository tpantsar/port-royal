import axios from 'axios';

interface ParsedError {
  message: string;
  status?: number;
}

/**
 * Parses an error object to extract a user-friendly error message and status code.
 * @param error - The error object to parse, typically an Axios error or a generic Error.
 * @returns An object containing the error message and optionally the HTTP status code.
 */
export function parseAxiosError(error: unknown): ParsedError {
  if (axios.isAxiosError(error)) {
    const response = error.response;
    const data = response?.data;
    const status = response?.status;

    console.debug('Axios error response data:', data);

    if (data?.detail) {
      return { message: data.detail, status: status };
    }

    if (data?.message) {
      return { message: data.message, status: status };
    }

    if (data && typeof data === 'string') {
      return { message: data, status: status };
    }

    if (data?.error?.[0]) {
      const err = data.error[0];
      const message = err.path ? `${err.path}: ${err.message}` : err.message;
      return { message, status: status };
    }

    return { message: `API Error (status ${status})`, status: status };
  } else if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'Unknown error occurred' };
}

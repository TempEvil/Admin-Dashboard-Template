/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface KeyValue {
    [key: string]: any | number;
  }

  interface ResponseAPI<T = KeyValue[] | KeyValue> {
    header: {
      statusCode: number;
      message?: string;
      pagination: KeyValue | null;
    };
    body: T;
  }

  interface ResponseWithPagination<T> {
    pagination: KeyValue | null;
    body: T;
  }

  interface AuthToken {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    error?: string;
  }

  type ReactSelectOptionType = { value: number; label: string };
}

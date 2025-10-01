/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from "@tanstack/react-query";

const defaultQueryClientOptions = {
  queries: {
    retry: (failureCount: any, error: any) => {
      // Don't retry for 401 errors
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
  },
};

export const query_client = new QueryClient({
  defaultOptions: defaultQueryClientOptions,
});

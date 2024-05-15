import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/interfaces/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const requestHandler = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api: () => Promise<AxiosResponse<ApiResponse, any>>,
  setLoading: ((loading: boolean) => void) | null,
  onSuccess: (data: ApiResponse) => void,
  onError: (error: string) => void
) => {
  setLoading && setLoading(true);

  try {
    const response = await api();
    const { data } = response.data;
    if (data?.success) {
      onSuccess(data);
    }
  } catch (error: any) {
    if ([401, 403].includes(error?.response.data?.statusCode)) {
      // handle unauthorized or forbidden
      LocalStorage.clear();
      // if (isBrowser) window.location.href = "/login";
    }
    onError(error?.response.data?.message || "Something went wrong");
  } finally {
    setLoading && setLoading(false);
  }
};

export const isBrowser = typeof window !== "undefined";

// A class that provides utility functions for working with local storage
export class LocalStorage {
  // Get a value from local storage by key
  static get(key: string) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key: string, value: any) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key: string) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

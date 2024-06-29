import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { ApiError } from "./apiError";
import { omit } from "lodash";

export const request = async <T>({ headers, url, params, ...rest }: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axios.request<T>({
      headers: {
        ...(headers || {}),
      },
      url: `${import.meta.env.VITE_API_URL}/${url}`,
      ...rest,
      params: {
        ...omit(params, "params"),
        ...(params as { params?: T })?.params,
      },
      paramsSerializer: (p) => {
        return qs.stringify(p, { arrayFormat: "indices" });
      },
    });
    return response.data;
  } catch (e) {
    const error = e as Error;
    throw new ApiError(error);
  }
};

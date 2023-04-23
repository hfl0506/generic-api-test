import { assertError } from "./assertError";
import httpApi from "./instance";

type BaseApiResponse<TData> = {
  data: TData;
  status: number;
  timestamp: number;
};

export const getApi = async <TResponse, TQuery = object>(
  path: string,
  query?: TQuery
) => {
  try {
    let params = {};
    if (query !== undefined) {
      params = {
        params: query,
      };
    }
    return await httpApi.get<BaseApiResponse<TResponse>>(path, params);
  } catch (error) {
    assertError(error);
  }
};

export const postApi = async <TResponse, TBody>(path: string, body: TBody) => {
  try {
    return await httpApi.post<BaseApiResponse<TResponse>>(path, body);
  } catch (error) {
    assertError(error);
  }
};

export const putApi = async <TResponse, TBody>(path: string, body: TBody) => {
  try {
    return await httpApi.put<BaseApiResponse<TResponse>>(path, body);
  } catch (error) {
    assertError(error);
  }
};

export const deleteApi = async <TResponse>(path: string) => {
  try {
    return await httpApi.delete<BaseApiResponse<TResponse>>(path);
  } catch (error) {
    assertError(error);
  }
};

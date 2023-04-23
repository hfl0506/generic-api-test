import axios from "axios";
import { getAccessToken } from "../helpers/tokens";

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (request) => {
  // TODO add session check later
  const session = getAccessToken();

  if (session) {
    request.headers = request.headers ?? {};
    request.headers.Authorization = `Bearer ${session}`;
  }

  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      error.response.config &&
      error.response.config.headers &&
      error.response.config.headers.Authorization
    ) {
      // TODO signout logic
    }
    return Promise.reject(error);
  }
);

export default instance;

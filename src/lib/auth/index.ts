import { getApi, postApi } from "../base";

type LoginPlatform = "web";

type LoginPayload = {
  authorizationCode: string;
  codeVerifier: string;
  platform: LoginPlatform;
};

type RefreshTokenPayload = {
  refreshToken: string;
};

type LoginResponse = {
  userId: string;
  displayName: string;
  email: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
};

type RefreshTokenResponse = {
  userId: string;
  displayName: string;
  email: string;
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
};

export const loginApi = async (code: string) => {
  const body: LoginPayload = {
    authorizationCode: code,
    codeVerifier: generateCodeVerifier(),
    platform: "web",
  };
  return await postApi<LoginResponse, LoginPayload>("/login", body);
};

export const logoutApi = async (accessToken: string) => {
  return await postApi("/logout", { token: accessToken });
};

export const refreshTokenApi = async (rt: string) => {
  return await postApi<RefreshTokenResponse, RefreshTokenPayload>("/refresh", {
    refreshToken: rt,
  });
};

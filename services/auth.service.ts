import { api } from "./api";
import { LoginRequest, LoginResponse } from "@/types/auth";

export const loginRequest = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    "/login/acessar",
    payload
  );

  return data;
};

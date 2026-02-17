import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/services/auth.service";
import { LoginRequest, LoginResponse } from "@/types/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (payload) => loginRequest(payload),
  });
};

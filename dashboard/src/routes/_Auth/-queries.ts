import { useMutation } from "@tanstack/react-query";
import instance from "../../lib/axios";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      role,
      password,
    }: {
      name: string;
      email: string;
      role: string;
      password: string;
    }) => {
      return instance.post("/auth/sign-up", {
        name,
        email,
        role,
        password,
      });
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return instance.post("/auth/login", {
        email,
        password,
      });
    },
  });
};

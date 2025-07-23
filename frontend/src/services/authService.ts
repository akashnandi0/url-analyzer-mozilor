import type { AxiosResponse } from "axios";
import type { User, LoginResponse } from "../type";
import httpService from "./httpService";

export const registerUser = (data: User): Promise<AxiosResponse> => {
  return httpService.post("user-create/", data);
};

export const loginUser = (
  data: User,
): Promise<AxiosResponse<LoginResponse>> => {
  return httpService.post("login/", data);
};

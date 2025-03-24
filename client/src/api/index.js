// services/api/index.js
import { authApi } from "./auth";
import { userApi } from "./user";

export const api = {
  auth: authApi,
  user: userApi,
};

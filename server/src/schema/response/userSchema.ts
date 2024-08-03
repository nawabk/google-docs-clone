import User from "../../models/userModel";
import { GenericResponse, ID, PaginatedResponse } from "./GenericResponse";

export type UserResponse = GenericResponse<
  ID & Omit<User, "password" | "passwordConfirm">
>;

export type SearchUserResponse = PaginatedResponse<
  {
    _id: string;
    username: string;
    email: string;
  }[]
>;

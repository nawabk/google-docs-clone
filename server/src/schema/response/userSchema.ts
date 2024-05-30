import User from "../../models/userModel";
import { GenericResponse, ID } from "./GenericResponse";

export type UserResponse = GenericResponse<
  ID & Omit<User, "password" | "passwordConfirm">
>;

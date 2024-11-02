import { Request } from "express";
enum userType {
  Admin = "Admin",
  User = "User",
  //  ~
  // ',' expected.
}

export interface User {
  username: string;
  id: string;
}
export interface SignupRequestBody {
  username: string;
  type: userType;
  password: string;
}
export interface UserResponse {
  userId: string;
}

export interface SigninBody {
  username: string;
  password: string;
}

export interface JwtPayload {
  username: string;
  password: string;
}

export interface UpdatePicRequest extends Request {
  avatarId: string;
  user: User;
}

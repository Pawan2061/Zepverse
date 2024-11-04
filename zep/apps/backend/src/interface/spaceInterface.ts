import { Request } from "express";
export interface SpaceDimension {
  name: string;
  width: number;
  height: number | null;
  id: string;
  thumbnail: string | null;
  userId: string | null;
}
export interface User extends Request {
  username: string;
  id: string;
}
export interface SpaceRequestBody extends Request {
  name: string;
  dimensions: string;
  mapId: string;
  user: User;
}

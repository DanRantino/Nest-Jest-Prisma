import { Calendar, Role } from '@prisma/client';

export interface IUserRequest {
  userName: string;
  password: string;
}

export interface IDecodUser {
  userName: string;
  sub: number;
  iat: number;
  exp: number;
}

export interface IUser {
  id?: number;
  userName: string;
  password?: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  role?: Role | null;
  calendar?: Calendar[] | null;
  params?: any | null;
}

export interface IUserApiResp {
  data?: IUser | IUser[] | null;
  err?: {
    hasError: boolean;
    errorMessage: string;
  };
}

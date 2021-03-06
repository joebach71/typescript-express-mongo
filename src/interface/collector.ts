
export interface IUser {
  username: string;
  password: string;
  createdAt?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export enum RESPONSE_CODE {
  SUCCESS,
  FAILED
}
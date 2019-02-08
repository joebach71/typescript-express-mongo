
export interface IUser {
  email: string;
  password: string;
  createdAt?: number;
  firstName?: string;
  lastName?: string;
}

export enum RESPONSE_CODE {
  SUCCESS,
  FAILED
}
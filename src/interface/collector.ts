
export interface IUser {
  username: string;
  createdAt: number;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export enum RESPONSE_CODE {
  SUCCESS,
  FAILED
}
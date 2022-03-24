export interface IUserS {
  userName: string;
  password: string;
}

export interface IUserR {
  id: number;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserApiResp {
  data: IUserR | IUserR[] | null;
  err?: { hasError: boolean; errorMessage: string };
}

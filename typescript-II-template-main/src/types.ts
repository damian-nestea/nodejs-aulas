export enum USER_ROLES {
  ADMIN = "admin",
  NORMAL = "normal",
}

// 1. Type Alias para uma pessoa (TPerson) com as propriedades id, name, email, password e role;

export type TPerson = {
  id: string | number;
  name: string;
  email: string;
  password: string;
  role: string;
};

// Exemplo:

type TMeuArray = string | number | boolean;

const array: TMeuArray[] = ["oi", true];

// 2. Type Aliases para 2 contas (AdminAccount, NormalAccount) com as propriedades account e permission;

export type TAdminAccount = {
  account: string;
  permission: string;
};

export type TNormalAccount = {
  account: string;
  permission: string;
};

export type TUserAdmin = TPerson & TAdminAccount;
export type TUserNormal = TPerson & TNormalAccount;

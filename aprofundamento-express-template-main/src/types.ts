export enum ACCOUNT_TYPE {
  BRONZE = "Bronze",
  SILVER = "Prata",
  GOLD = "Ouro",
  PLATINUM = "Platina",
  BLACK = "Black",
}

export enum ILLNESS_URGENCY {
  URGENT = "Urgent",
  NORMAL = "Normal",
}

export type TAccount = {
  id: string;
  ownerName: string;
  balance: number;
  type: ACCOUNT_TYPE;
};

export type TPatient = {
  id: string;
  name: string;
  age: number;
  type: ILLNESS_URGENCY;
};

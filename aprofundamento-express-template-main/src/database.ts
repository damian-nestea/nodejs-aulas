import { ACCOUNT_TYPE, ILLNESS_URGENCY, TAccount, TPatient } from "./types";

export const accounts: TAccount[] = [
  {
    id: "a001",
    ownerName: "Ciclano",
    balance: 10000,
    type: ACCOUNT_TYPE.GOLD,
  },
  {
    id: "a002",
    ownerName: "Astrodev",
    balance: 500000,
    type: ACCOUNT_TYPE.BLACK,
  },
  {
    id: "a003",
    ownerName: "Fulana",
    balance: 20000,
    type: ACCOUNT_TYPE.PLATINUM,
  },
];

export const patients: TPatient[] = [
  {
    id: "p01",
    name: "Damian",
    age: 35,
    type: ILLNESS_URGENCY.NORMAL,
  },
  {
    id: "p02",
    name: "Ana",
    age: 90,
    type: ILLNESS_URGENCY.URGENT,
  },
  {
    id: "p03",
    name: "Daniel",
    age: 19,
    type: ILLNESS_URGENCY.URGENT,
  },
  {
    id: "p04",
    name: "Maria",
    age: 29,
    type: ILLNESS_URGENCY.NORMAL,
  },
  {
    id: "p05",
    name: "Felipe",
    age: 30,
    type: ILLNESS_URGENCY.NORMAL,
  },
];

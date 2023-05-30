/* PRÁTICA GUIADA - Parte 1
Crie um sistema de cadastro de usuários que contenha:

1. Type Alias para uma pessoa (TPerson) com as propriedades id, name, email, password e role;
2. Type Aliases para 2 contas (AdminAccount, NormalAccount) com as propriedades account e permission;
3. Crie exemplos de usuários Admin e Normal;
*/

import { TUserAdmin, TUserNormal, USER_ROLES } from "./types";

/* PRÁTICA GUIADA - Parte 2
Vamos continuar nosso sistema de cadastro de usuários criando:

1. Enum com valores ADMIN e NORMAL e atribua ã propriedade role do Tperson;
2. Tipo Intersection unindo: pessoa(Person) + permissão (Role);
3. Um array de usuários que permite guardar apenas usuários do tipo Person + Role;

*/

const userAdmin: TUserAdmin = {
  id: 1,
  name: "Admin",
  email: "admin@gmail.com",
  password: "012345",
  role: "admin",
  account: "001",
  permission: USER_ROLES.ADMIN,
};

const userAdmin_2: TUserAdmin = {
  id: 2,
  name: "Admin2",
  email: "admin2@gmail.com",
  password: "0123456",
  role: "admin",
  account: "002",
  permission: USER_ROLES.ADMIN,
};
const userAdmin_3: TUserAdmin = {
  id: 3,
  name: "Admin3",
  email: "admin3@gmail.com",
  password: "01234256",
  role: "admin",
  account: "003",
  permission: USER_ROLES.ADMIN,
};
const userNormal: TUserNormal = {
  id: 4,
  name: "usuário normal",
  email: "normaluser@gmail.com",
  password: "012345",
  role: "normal",
  account: "004",
  permission: USER_ROLES.NORMAL,
};

const userAdminList: TUserAdmin[] = [userAdmin, userAdmin_2, userAdmin_3];
console.log(userAdminList);

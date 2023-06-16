import express, { Request, Response } from "express";
import cors from "cors";
import { accounts } from "./database";
import { ACCOUNT_TYPE } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

/* getAllAccounts */
app.get("/accounts", (req: Request, res: Response) => {
  res.send(accounts);
});

/* getAccountById */
app.get("/accounts/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id && id[0] !== "a") {
      res.status(400);
      throw new Error("Invalid Id. The id should starts with 'a'.");
    }
    const result = accounts.find((account) => account.id === id);
    if (!result) {
      res.status(404);
      throw new Error("Account not found");
    }
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

/* deleteAccountById */
app.delete("/accounts/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id && id[0] !== "a") {
      res.status(400);
      throw new Error("Invalid Id. The id should starts with 'a'.");
    }
    const accountIndex = accounts.findIndex((account) => account.id === id);
    if (accountIndex < 0) {
      res.status(404);
      throw new Error("Account not found");
    }
    accounts.splice(accountIndex, 1);

    res.status(200).send("Item deletado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

/* editAccount */
app.put("/accounts/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id && id[0] !== "a") {
      res.status(400);
      throw new Error("Invalid Id. The id should starts with 'a'.");
    }

    const newId = req.body.id as string | undefined;
    const newOwnerName = req.body.ownerName as string | undefined;
    const newBalance = req.body.balance;
    const newType = req.body.type as ACCOUNT_TYPE | undefined;

    /* Verifica newBalance */
    if (newBalance !== undefined) {
      if (typeof newBalance !== "number") {
        res.status(422);
        throw new Error("Valor de balance deve ser numérico.");
      }
      if (newBalance < 0) {
        res.status(400);
        throw new Error("Valor de balance deve ser maior que 0.");
      }
    }

    /* Verifica newType */
    if (newType !== undefined) {
      if (
        newType !== ACCOUNT_TYPE.BLACK &&
        newType !== ACCOUNT_TYPE.GOLD &&
        newType !== ACCOUNT_TYPE.PLATINUM
      ) {
        res.status(400);
        throw new Error(
          "O type precisa ser uma das seguintes valores:\nBlack\nPlatina \nOuro"
        );
      }
    }

    const account = accounts.find((account) => account.id === id);
    if (!account) {
      res.status(404);
      throw new Error("Conta não encontrada.");
    }

    /* Verifica se tem ao menos algum dos dados */
    if (!newId && !newOwnerName && !newType && newBalance === undefined) {
      res.status(400);
      throw new Error("Sem dados válidos para edição.");
    }
    /* Verifica se o caso tiver novo nome do dono da conta, tenha como mínimo 2 caracteres */
    if (newOwnerName !== undefined && newOwnerName.length < 2) {
      throw new Error(
        "Nome do dono da conta deve conter mais de 2 caracteres!"
      );
    }

    /* Verifica se o Id começa com a letra a e contem 4 caracteres */
    if (newId !== undefined && (newId[0] !== "a" || newId.length !== 4)) {
      throw new Error(
        "O id deve começar com a letra a minúscula e contém 4 caracteres!"
      );
    }

    if (account) {
      account.id = newId || account.id;
      account.ownerName = newOwnerName || account.ownerName;
      account.type = newType || account.type;
      account.balance = newBalance >= 0 ? newBalance : account.balance;
      res.status(200).send("Usuário editado com sucesso!");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

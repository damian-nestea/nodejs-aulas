import express, { Request, Response } from "express";
import cors from "cors";
import { accounts, patients } from "./database";
import { ACCOUNT_TYPE, ILLNESS_URGENCY, TPatient } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

/* Get all accounts */
app.get("/accounts", (req: Request, res: Response) => {
  res.send(accounts);
});

/* Get account by Id */
app.get("/accounts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const response = accounts.find((account) => {
    return account.id.toLowerCase() === id.toLowerCase();
  });
  res.status(200).send(response);
});

/* Delete account by Id */
app.delete("/accounts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexAccountToDelete = accounts.findIndex((account) => {
    return account.id.toLowerCase() === id.toLowerCase();
  });
  if (indexAccountToDelete >= 0) {
    accounts.splice(indexAccountToDelete, 1);
    res.status(200).send("Item deletado com sucesso!");
  } else {
    res.status(404).send("Item não encontrado!");
  }
});

/* Edit account by ID - Método PUT */
app.put("/accounts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newId = req.body.id as string | undefined;
  const newOwnerName = req.body.ownerName as string | undefined;
  const newBalance = req.body.balance as number | undefined;
  const newType = req.body.type as ACCOUNT_TYPE | undefined;

  const accountToEdit = accounts.find((account) => {
    return account.id === id;
  });

  /* Edição de elementos do array accounts */
  if (accountToEdit) {
    accountToEdit.id = newId || accountToEdit.id;
    accountToEdit.ownerName = newOwnerName || accountToEdit.ownerName;
    accountToEdit.balance = isNaN(newBalance)
      ? accountToEdit.balance
      : newBalance;
    accountToEdit.type = newType || accountToEdit.type;
    res.status(200).send("Atualização realizada com sucesso!");
  } else {
    res.status(404).send("Item não encontrado!");
  }
});

/* Patients API */
/* Get all patients */
app.get("/patients", (req: Request, res: Response) => {
  res.status(200).send(patients);
});

/* Create patient */
app.post("/patients", (req: Request, res: Response) => {
  const {
    id,
    name,
    age,
    type,
  }: { id: string; name: string; age: number; type: ILLNESS_URGENCY } =
    req.body;
  const newPatient: TPatient = {
    id,
    name,
    age,
    type,
  };

  if (id && name && age && type) {
    if (
      type.toLowerCase() === ILLNESS_URGENCY.NORMAL.toLowerCase() ||
      type.toLowerCase() === ILLNESS_URGENCY.URGENT.toLowerCase()
    ) {
      patients.push(newPatient);
      res.status(200).send("Paciente registrado com sucesso!");
    } else {
      res
        .status(400)
        .send("Informação incorreta. Verifique o tipo de paciente");
    }
  } else {
    res.status(400).send("Informação faltante");
  }
});

/* Update patient */
app.put("/patients/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newId = req.body.id as string | undefined;
  const newName = req.body.name as string | undefined;
  const newAge = req.body.age as number | undefined;
  const newType = req.body.type as ILLNESS_URGENCY | undefined;

  const patientToEdit = patients.find((patient) => {
    return patient.id === id;
  });

  if (patientToEdit) {
    if (newId || newName || newAge || newType) {
      patientToEdit.id = newId || patientToEdit.id;
      patientToEdit.name = newName || patientToEdit.name;
      patientToEdit.age = isNaN(newAge) ? patientToEdit.age : newAge;
      patientToEdit.type = newType || patientToEdit.type;
      res.status(200).send("Paciente editado com sucesso!");
    } else {
      res.status(400).send("Sem dados para a requisição");
    }
  } else {
    res.status(404).send("Paciente não encontrado!");
  }
});

/* Delete patient account */
app.delete("/patients/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    const indexPatientToDelete = patients.findIndex((patient) => {
      return patient.id === id;
    });
    if (indexPatientToDelete >= 0) {
      patients.splice(indexPatientToDelete, 1);
      res.status(200).send("Conta do paciente deletada com sucesso!");
    } else {
      res.status(404).send("Paciente não encontrado!");
    }
  } else {
    res.status(400).send("Id não informado para a requisição!");
  }
});

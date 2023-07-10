import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

/* Exercício 1  Busca de bandas */
app.get("/bands", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM bands;`);
    res.status(200).send(result);
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

/* Exercício 2  Endpoint para inserir dados na tabela */
app.post("/bands", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;

    if (!id || !name) {
      res.status(400);
      throw new Error("Dados faltando. Verifique.");
    }

    if (typeof id !== "string") {
      res.status(422);
      throw new Error("Id deve ser uma string.");
    }

    if (typeof name !== "string") {
      res.status(422);
      throw new Error("Name deve ser uma string.");
    }

    // caso sucesso na validação
    await db.raw(`
        INSERT INTO bands(id,name) VALUES
        ("${id}" , "${name}");
    `);
    res.status(200).send("Banda inserida com sucesso.");
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

/* Exercício 3 Endpoint para edição de bandas */
app.put("/bands/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (newId.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 1 caractere");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (newName.length < 2) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 2 caracteres");
      }
    }

    if (!newId && !newName) {
      res.status(400);
      throw new Error("Sem dados");
    }

    // verificamos se o user a ser editado realmente existe
    const [band] = await db.raw(`
					SELECT * FROM bands
					WHERE id = "${id}";
				`); // desestruturamos para encontrar o primeiro item do array

    // se existir, aí sim podemos editá-lo
    if (band) {
      await db.raw(`
							UPDATE bands
							SET
								id = "${newId || band.id}",
								name = "${newName || band.name}"
							WHERE
								id = "${id}";
						`);
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

/* getAllSongs */
app.get("/songs", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM songs`);
    res.status(200).send(result);
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

/* createSong */
app.post("/songs", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const bandId = req.body.bandId;

    if (!id || !name || !bandId) {
      res.status(400);
      throw new Error("Dados faltantes. Confira");
    }

    if (typeof id !== "string") {
      res.status(422);
      throw new Error("'id' deve ser uma string");
    }

    if (typeof name !== "string") {
      res.status(422);
      throw new Error("'name' deve ser uma string");
    }

    if (typeof bandId !== "string") {
      res.status(422);
      throw new Error("'bandId' deve ser uma string");
    }

    // caso a validação tenha sucesso
    const bandExist = await db.raw(`
      SELECT * FROM bands
      WHERE id = "${bandId}";
    `);

    if (bandExist.length <= 0) {
      res.status(400);
      throw new Error("Id de banda não existe");
    }

    await db.raw(`
        INSERT INTO songs(id, name, band_id ) VALUES
        ("${id}","${name}","${bandId}");
    `);
    res.status(200).send("Song created!");
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

/* Edit Song */
app.put("/songs/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newBandId = req.body.bandId;

    if (!id || (!newId && !newName && !newBandId)) {
      res.status(400);
      throw new Error("Dados faltantes. Confira.");
    }

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (newId.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 1 caractere");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (newName.length < 2) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 2 caracteres");
      }
    }

    if (newBandId !== undefined) {
      if (typeof newBandId !== "string") {
        res.status(400);
        throw new Error("'bandId' deve ser string");
      }

      if (newBandId.length < 2) {
        res.status(400);
        throw new Error("'bandId' deve possuir no mínimo 2 caracteres");
      }
    }

    // verificamos se o user a ser editado realmente existe
    const [song] = await db.raw(`
					SELECT * FROM songs
					WHERE id = "${id}";
				`); // desestruturamos para encontrar o primeiro item do array

    const bandExist = await db.raw(`
      SELECT * FROM bands
      WHERE id = "${newBandId}";
    `);

    if (!song) {
      res.status(400);
      throw new Error("Song doesnt exists!");
    }

    if (bandExist.length <= 0 && newBandId !== undefined) {
      res.status(400);
      throw new Error("Id de banda não existe");
    }
    // se existir, aí sim podemos editá-lo
    if (song) {
      await db.raw(`
							UPDATE songs
							SET
								id = "${newId || song.id}",
								name = "${newName || song.name}",
								band_id = "${newBandId || song.band_id}"
							WHERE
								id = "${id}";
						`);
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

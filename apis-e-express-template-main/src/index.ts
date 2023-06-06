import express, { Request, Response } from "express";
import cors from "cors";
import { courses, students } from "./database";
import { TCourse, TStudent } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

/* Test */
app.get("/", (req: Request, res: Response) => {
  res.send("Api rodando!");
});

/* Ping */
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

/* Get All Courses */
app.get("/courses", (req: Request, res: Response) => {
  res.status(200).send(courses);
});

/* Get course by name */
app.get("/courses/search", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const response = courses.filter((course) => {
    return course.name.toLowerCase().includes(name.toLowerCase());
  });
  res.status(200).send(response);
});

/* Register course */
app.post("/courses", (req: Request, res: Response) => {
  const { id, name, lessons, stack } = req.body;
  const newCourse: TCourse = {
    id,
    name,
    lessons,
    stack,
  };
  courses.push(newCourse);
  res.status(201).send("Curso registrado com sucesso");
  console.log(courses);
});

/* EndPoints de Students */

/* Get all students */
app.get("/students", (req: Request, res: Response) => {
  res.status(200).send(students);
});

/* Get student by name */
app.get("/students/search", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const response = students.filter((student) => {
    return student.name.toLowerCase().includes(name.toLowerCase());
  });
  res.status(200).send(response);
});

/* Register student */
app.post("/students", (req: Request, res: Response) => {
  const { id, name, age } = req.body;
  const newStudent: TStudent = {
    id,
    name,
    age,
  };
  students.push(newStudent);
  res.status(201).send("Aluno registrado com sucesso");
  console.log(students);
});

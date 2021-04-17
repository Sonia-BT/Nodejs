// // import * as fs from "fs" syntax non supporté par node donc en utilise require
// // const fs = require("fs");
// // const path = require("path");
// // const chemin = path.join(__dirname, "files", "test.txt"); //tout dab directory name ensuite le dossier où on veut ajouter un fichier text
// // const test = "test";
// // fs.writeFile(chemin, test, () => console.log("finished")); //permet de créer le fichier textnpm
// // console.log(chemin);

// const express = require("express");

// const app = express();
// app.use(express.json());

// // app.get("/", (req, res) => {
// //   res.send("Hello World get ");
// // });

// // le format json peut etre utilisé il suffit de remplacer send par json et remplir les donées
// app.get("/", (req, res) => {
//   res.status(404).json({ messages: "hello world" });
// });

// app.post("/", (req, res) => {
//   //   console.log(req.body);
//   console.log(req.query);
//   res.send("Hello World post");
// });

// app.listen(5000, () => console.log("Listening on http://localhost:5000")); // il faut préciser le domaine et le port
// console.log("hello");

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());
const todos = [];
app.get("/", (req, res) => {
  //   console.log(req.params);
  //   res.status(399).json({
  //     message: "hello get id : " + req.params.id,
  //   });
  res.status(200).json({
    message: "Fetched successfully",
    data: todos,
  });
});

app.get("/:id", (req, res) => {
  res.status(200).json({
    message: "Fetched successfully",
    data: todos.find((el) => el.id == req.params.id),
  });
});

app.post("/", (req, res) => {
  const { task } = req.body;
  const todo = {
    id: uuidv4(),
    task,
    checked: false,
  };
  todos.push(todo);
  res.status(201).json({
    message: "Successfully added",
    data: todo,
  });
});

app.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const todo = todos.find((el) => el.id == id);
    todo.task = task;
    res.status(200).json({
      message: "Change successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json("ERROR server type");
  }
});

app.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;
  const todo = todos.find((el) => el.id == id);
  todo.checked = !checked;
  res.status(200).json({
    message: "Change successfully",
    data: todo,
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((el) => el.id != id);
  res.status(200).json({
    message: "Change successfully",
    data: todos,
  });
});

app.listen(5000, () => console.log("Listening on http://localhost:5000"));

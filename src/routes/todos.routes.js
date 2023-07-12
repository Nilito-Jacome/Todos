const { Router } = require("express");
const {
  postTodos,
  getTodosById,
  getAllTodos,
  putTodos,
  deleteTodos,
} = require("../controllers/todos.controllers");

const router = Router();

router.post("/Todos", postTodos);

router.get("/todos", getTodosById);

router.get("/todos/:id", getAllTodos);

router.put("/todos/:id", putTodos);

router.delete("/todos/:id", deleteTodos);

module.exports = router;

const Todos = require("../models/todos.model");

const postTodos = async (req, res) => {
  try {
    const { title, description, IsCompleted } = req.body;
    await Todos.create({ title, description, IsCompleted });
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTodosById = async (req, res) => {
  try {
    const todos = await Todos.findAll({
      attributes: ["id", "title", "description", "IsCompleted"],
    });
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todos.findByPk(id);
    res.json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

const putTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, IsCompleted } = req.body;
    await Todos.update(
      { title, description, IsCompleted },
      {
        where: { id: id },
      }
    );
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;
    await Todos.destroy({
      where: { id: id }, //--> igual a {id}
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  postTodos,
  getTodosById,
  getAllTodos,
  putTodos,
  deleteTodos,
};

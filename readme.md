# Sequelize

## Instalacion de sequelize

---
npm i pg pg-hstore
---

## Crear conexion a una base de datos
1. crear instancia de sequelize
    Crear carpeta utils
        Crear archivo database.js dentro de utils
    
---
    const { Sequelize } = require('sequelize');
---

    Creamos y configuramos la conexion
    
---
    const db = new Sequelize({
    host: 'localhost',
    database: 'todos_db',
    port: 5432,
    username: 'nilo',
    password:'1978',
    dialect:'postgres'
    });
---
    Exportamos la instancia
---
    module.exports = db;
---
## Comprobar la conexion de la base de datos
    usamos el metodo authenticate()para comprobar la conexion
        En app.js ingresamos la ubicacion o la ruta de la base datos
            importar instancia 
                const db = require('./utils/database'); // no lleva extension
            usr el metodo authenticate()
                db.authenticate()
                .then (() => {
                    console.log('Base de datos conectada correctamente');
                })
                .catch(error => console.log(error))
## Modelos

    Crear una carpeta llamada models
    Dentro de la carpeta models crear un archivo llamado todos.model.js
---
    const { DataTypes } = require('sequelize')
    const db = require('../utils/database'); // no lleva extension

    const Todos = db.define('nj_todos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        description:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        completed:{
            type: DataTypes.BOOLEAN,
            dafaultValue: 'false'
        },
    })
    module.exports = Todos;
---
## CREATE
    Todos.create({
    title:'useState',
    description:'funcionamiento de un estado en react',
    IsCompleted:'true'
    })
    app.post('/Todos', async (req, res) => {
    try{
        const newTodo = req.body; //Todo obtener la informacion del body
        const njtodo = await Todos.create(newTodo); //Todo mandar a crear la informacion obtenida
        res.status(201).json(njtodo); // todo por defecto se envia 200
    } catch (error) {
        res.status(400).json(error);
    }
    })

## READ
    Todos los campos
    //* SELECT * FROM todos;
    app.get('/todos', async (req, res) => {
        try{
            const todos = await Todos.findAll(); // Todo mandar a buscar a todos los usuarios
            res.json(todos); // Todo responder al cliente
        } catch (error) {
            res.status(400).json(error);
        }
    })
    No todos los campos
    app.get('/todos', async (req, res) => {
    try{
        const todos = await Todos.findAll({
            attributes:['id', 'title', 'description', 'IsCompleted'],
        }); // Todo mandar a buscar a todos los usuarios
        res.json(todos); // Todo responder al cliente
    } catch (error) {
        res.status(400).json(error);
    }
    });

    otra forma es excluyendo lo que no quiero
    attributes:{
        exclude:["title"],
    },

    busqueda por usuario
    //Encontrar un todo por id
    app.get('/todos/:id', async (req, res) => {
        //{params: {
        //  id: 1,
            //title: 'xxxxx',
            //description: 'xxxxx'
        //}}
        try{
            const { id } = req.params;  //Todo obtener el id de la ruta
            const todo = await Todos.findByPk(id); // Todo realizar la consulta a la base de datos
            res.json(todo); // Todo responder al cliente
        } catch (error) {
            res.status(400).json(error);
        }
    });

## UPDATE
    //*************UPDATE*****************/
    app.put('/todos/:id', async(req, res) => {
        try{
            const { id } = req.params;  //Todo obtener el id del usuario
            const todoInfo= req.body; // Todo obtener el body con la informacion
            await Todos.update(todoInfo, {
                where:{id: id} //--> igual a {id}
            }); // Todo realizar la consulta para actualizar
            res.status(204).send(); // Todo responder al cliente
        } catch (error) {
            res.status(400).json(error);
        }
    })

## DELETE
//*************DELETE*****************/
app.delete('/todos/:id', async(req, res) => {
    try{
        const { id } = req.params;  //Todo obtener el id de la ruta      
        await Todos.destroy( {
            where:{id: id} //--> igual a {id}
        }); // Todo eliminar en labase de datos
        res.status(204).send(); // Todo responder al cliente
    } catch (error) {
        res.status(400).json(error);
    }
})



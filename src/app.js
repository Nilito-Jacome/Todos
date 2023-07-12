const express = require('express');
const db = require('./utils/database');
const cors = require('cors');
require("dotenv").config();
const useRoutes = require('./routes/todos.routes');
const PORT = process.env.PORT ?? 8000;
const app = express();

db.authenticate()
.then (() => {
    console.log('Base de datos 1 conectada correctamente');
})
.catch(error => console.log(error))

db.sync()
.then(() => console.log('base de datos sincronizada'));

app.use (express.json());
app.use(cors());

app.use(useRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor');
});

app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


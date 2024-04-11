require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const createConnection = require('./routes/createConnection')
const checkToken = require('./middlewares/checkToken');
const showConnection = require('./routes/showConnection');
const selectConnections = require('./middlewares/selectConnections');


app.get('/users',checkToken, async (req, res) =>{
    const decodedToken = req.decodedToken;
    res.status(200).json({msg: decodedToken.id})
    
})







app.post('/auth/register', registerRoute);
app.post('/auth/login', loginRoute)
app.post('/connection/create', checkToken, createConnection);

app.get('/connection/show', checkToken, selectConnections, showConnection);




app.get('/', (req, res) =>{
    res.status(200).json({msg: 'Bem-Vindo à nossa api!'});
})
//CREDENCIAIS

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${db_user}:${db_pass}@htwebapi.w23ssu8.mongodb.net/?retryWrites=true&w=majority&appName=htWebApi`
).then(() => {
    app.listen(process.env.PORT || 3000);
    console.log('banco conectado!')
}).catch((e) => console.log(e))


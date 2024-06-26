require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const app = express();


const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  };
  
  
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.static("public"));

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const createConnection = require('./routes/createConnection')
const checkToken = require('./middlewares/checkToken');
const checkRouteToken = require('./middlewares/checkRouteToken')
const showConnection = require('./routes/showConnection');
const selectConnections = require('./middlewares/selectConnections');
const deleteConnection = require('./routes/deleteConnection');
const authorizeConnection = require('./routes/authorizeConnection');
const authUser = require('./routes/authUser');


app.get('/users',checkToken, async (req, res) =>{
    const decodedToken = req.decodedToken;
    res.status(200).json({msg: decodedToken.id})
    
})







app.post('/auth/register', registerRoute);
app.post('/auth/login', loginRoute);
app.get('/auth/:token', checkRouteToken, authUser);

app.post('/connection/create', checkToken, createConnection);
app.post('/connection/delete', checkToken, deleteConnection);
app.get('/connection/show', checkToken, selectConnections, showConnection);
app.patch('/connection/authorize', checkToken, authorizeConnection);




app.get('/', (req, res) =>{
    res.status(200).json({msg: 'Bem-Vindo à nossa api!'});
})
//CREDENCIAIS

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${db_user}:${db_pass}@htwebapi.w23ssu8.mongodb.net/?retryWrites=true&w=majority&appName=htWebApi`
).then(() => {
    app.listen(process.env.PORT || 80);
    console.log('banco conectado!')
}).catch((e) => console.log(e))


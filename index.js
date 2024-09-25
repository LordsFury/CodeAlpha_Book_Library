require('dotenv').config();
const express=require('express');
var cors=require('cors');
const connectToMongo=require('./db');

connectToMongo();
const app=express();
app.use(express.json());
app.use(cors());

app.use('/user', require('./routes/auth'));
app.use('/admin',require('./routes/admin'));
app.use('/books', require('./routes/books'));

app.listen(5000);
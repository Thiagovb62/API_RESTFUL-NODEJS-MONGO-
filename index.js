require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.get('/api/', (req, res) => {
    res.json({ message: "eia express " })
})

const DB_user = 'Thiagovb62'

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("conectei no banco de dados");
    })
    .catch((e) => console.log(e));
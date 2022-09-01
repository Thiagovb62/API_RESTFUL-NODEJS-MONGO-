require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/Person');


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const personRoutes = require('./routes/PersonRoutes')

app.use('/person', personRoutes)

app.get('/api', (req, res) => {
    res.json({ message: "eia express " })
})



mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("conectei no banco de dados");
        app.listen(3000);
    })
    .catch((e) => console.log(e));
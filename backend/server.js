const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//TO RUN SERVER MAKE SURE YOU ARE IN THE BACKEND DIRECTORY
//To check versions of npm and node: npm -v      node -v
//Packages = npm install express cors mongoose dotenv
//npm install -g nodemon
//Using insomnia to verify data collection from backend
//MongoDB atlas to store data sent from backend

//ISSUE: check if server is up before npm start
//nodemon server from backend directory. Then npm start from platepal directory

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
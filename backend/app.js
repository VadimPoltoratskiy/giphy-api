const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const feedRoutes = require('./routes/feed')

const app = express()

const MONGODB_URI = `${process.env.MONGODB_CONN}/${process.env.MONGODB_DEFAULT_DB}`

app.use(bodyParser.json())

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data; 
  res.status(status).json({message: message, data: data});
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true } )
  .then((client) => {
    app.listen(process.env.PORT || 3000)
  })
  .catch(err => {
    console.log(err);
  });
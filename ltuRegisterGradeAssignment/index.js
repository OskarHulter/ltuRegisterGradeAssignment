const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongoDb
mongoose.connect('mongodb://localhost/studentprovdb', {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

//init routes
app.use('/api', require('./routes/api'));

//err handling middleware
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Hello world! im listening!');
});


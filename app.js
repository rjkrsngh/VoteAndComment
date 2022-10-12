'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// to remove the warnings related to useNewUrlParser and useUnifiedTopology
mongoose.connect('mongodb://localhost:27017/boo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongo!');
});

mongoose.connection.on('error', () => {
    console.log('error connecting to mongo!', err);
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Register user schema
require('./models/profile');

// Register authentication route
app.use(require('./routes/profile'));
app.use(require('./routes/comment'));

const port =  process.env.PORT || 3000;


if(process.env.NODE_ENV != 'test'){
// start server
const server = app.listen(port, ()=>{
    console.log('Server is up and running on port: %s', port);
});
}
module.exports = app;
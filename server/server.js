// define express app and bodyparser dependecies 
const app = require('express');
const bodyParser = require('body-parser');
const port = 5001;
// set static files for homepage
app.use(express.static('./server/public'));
// let express know how to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));
// require module functionality here
const calcHistory = require('modules/calcHistory.js');
const evaluate = require('module/evaluate.js');
const parseExpression = require('module/parseExpression.js');
// GET and POST routing 

// Define calcHistory GET request to provide user with requested data

// Define calcHistory POST requiest to update the history with the answer and new data


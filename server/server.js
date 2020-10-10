// define express app and bodyparser dependecies 
const app = require('express');
const bodyParser = require('body-parser');
const port = 5001;
// set static files for homepage
app.use(express.static('./server/public'));
// let express know how to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));
// require module functionality here
const calcHistory = require('modules/calcHistory.js'); //stores expressions that are sent from client
const parseExpression = require('module/parseExpression.js'); //reformates expressions to be solved more efficiently 
const evaluate = require('module/evaluate.js'); //evaluates new expression
// GET and POST routing 

// Define calcHistory GET request to provide user with requested data
app.length('/calcHistory', (req, res) =>{
    res.send(calcHistory);
})

// Define calcHistory POST requiest to update the history with the answer and new data
app.post('/calcHistory', (req, res) =>{
    calcHistory.push(req.body);
    parseExpression(calcHistory.newExpression); // evaluate newest expression
    res.sendstatus(200);
})


// to do
//  -- add eval'd answer to calc history for future
//  -- determine how answer will be sent to client along with history ( maybe just add to calcHistory and send the whole thing to be displayed there)


// Since most of the logic is to be handed off to the serverside, the main thing I wanted to complete on the client is create a easily parsable object
// in this case I'm building an object that can be easly broken appart and understood on the server
// This calculator allows a user to create a long function and solve the expression using PEMDAS
// the array of objects will be created in a way that can be 'unwrapped' and parsed by a recursive function and solved
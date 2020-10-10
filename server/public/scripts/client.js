// run function when page loaded
$(document).ready(onReady);

function onReady() {
    // using buttons instead of an input field lets me controll the integrity of the data. 
    // I believe this approach is called 'Stored Procedures' 
    // you can't input letters, and I have simple conditions that the expression has to meet in order for the 
    // client to accept it. 
    $('.charInput').on('click', buildNum); //build a floating point value 
    $('.operInput').on('click', addOpp); // add operators inbetween a value
    $('.modInput').on('click', runMod); // reset button, submit expression, clear expression, and backspace
}

//declare global variable
let expression = [] // this will be the completed expression sent whenever the equal button is pushed
let value = 'def';  // this is a storage place for the integer created by the buildNum function. this will be added to the array whenever an operator or submit button is selected.
                    // default value allows me to make sure the first obj in the expression is a integer 
            
function buildNum() { //this function is called whenever a character input is entered. this allows you to add multiple numbers or a decimal in a row and build a floating point value
    let char = $(this).val(); 
    if (value === 'def') { // this conditional initializes a number being built. 
        value = 0
    }
    value = value + char;
    // display new expression to dom
    appendValueToDom(char);
}

function addOpp() { // operators seporate floating point values, and also carry their own weight in PEMDAS, so I want to be able to access the operator easily on the server side and determine how the function
                    // will be solved (order)

    let lastExpObj = expression[expression.length -1]; // creating a variable that will help me verify that an expression is being created properly
    if (value === 'def') {
        alert('Please separate operators with a valid integer');
        return;
    }
    addValueToExp(value); // this will end creating a value and add it to the expression array
    value = 'def'          // resets value to default so that I know I need a number input next
    let operator = $(this).val();
    let operObj = {
        valType: 'operator',
        value: operator
    }
    // append new expression to DOM
    expression.push(operObj);
    appendExpToDOM();
}

function runMod() { // this function defines a list of buttons that perform misc functions. 
    let mod = $(this).attr('id')
    console.log(mod);
    
    if (mod === 'equal') {
        if (value === 'def') {
            alert('please create an expression')
            return;
        }
        // executed if data valid
        addValueToExp(value);
        console.log(expression);
        postExpression();
        expression = [];
        appendExpToDOM;
    } else if (mod === 'clearExp') {
        // clear expression and reset value
        expression = [];
        value = 'def'
        // empty DOM field
        appendExpToDOM()
    } else if (mod === 'reset') {
        // clear expression and reset value
        expression = [];
        value = 'def'
        // clear all history
        // empty DOM field
        appendExpToDOM()
    } else if (mod === 'bckSpc') {
        addValueToExp(value);
        value = 'def'
        //remove last item in expression
        expression.pop()
        //append new expression to DOM
        appendExpToDOM();
    }
}

function addValueToExp(currentValue) {// this function displays the value as it is being assembled. 
    let integer = {
        valType: 'integer',
        value: parseFloat(currentValue)
    }
    expression.push(integer);
}

function appendExpToDOM(){ // this function just displays the new expression as it is most recently written
    console.log(expression);
    $('#display').empty();
    for (let algObj of expression){ // algabraic object stored in the expression array
       $('#display').append(algObj.value);
    }
}

function appendValueToDom(char){ //the value is displayed as you'ring building it, so I made this seporate function to just show this
    console.log(char)
    $('#display').append(char)
}

function postExpression() {  // this will run when the user hits the equal button if the data is valid. 
    $.ajax({
        method: 'POST',
        url: '/calcHistory',
        data:{
            "expression": expression, // expression stored in the a key
            "answer": 0               // assigning the field that will be entered by the server
        }
    }).then((response) =>{
        console.log(response);
    }).catch((error) =>{
        alert(error);
    })
}
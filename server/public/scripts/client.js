// run function when page loaded
$(document).ready(onReady);

function onReady() {
    // using buttons instead of an input field lets me controll the integrity of the data. 
    // you can't input letters, and I have simple conditions that the expression has to meet in order for the 
    // client to accept it. 
    $('.charInput').on('click', buildNum); //build a floating point value 
    $('.operInput').on('click', addOpp); // add operators inbetween a value
    $('.modInput').on('click', runMod); // reset button, submit expression, clear expression, and backspace
}

//declare global variable
let expression = [] // this will be the completed expression sent whenever the equal button is pushed
let value = 0;  // this is a storage place for the integer created by the buildNum function. this will be added to the array whenever an operator or submit button is selected.
            
function buildNum() { //this function is called whenever a character input is entered. this allows you to add multiple numbers or a decimal in a row and build a floating point value
    let char = $(this).val(); 
    value = value + char;
    // display new expression to dom
    appendValueToDom(char);
}

function addOpp() { // operators seporate floating point values, and also carry their own weight in PEMDAS, so I want to be able to access the operator easily on the server side and determine how the function
                    // will be solved (order)

    addValueToExp(value); // this will end creating a value and add it to the expression array
    value = 0
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
        addValueToExp(value);
        console.log(expression);
        postExpression();
        expression = [];
        appendExpToDOM;
    } else if (mod === 'clearExp') {
        // clear expression
        expression = [];
        // empty DOM field
        appendExpToDOM()
    } else if (mod === 'reset') {
        // clear expression
        expression = [];
        // clear all history
        // empty DOM field
        appendExpToDOM()
    } else if (mod === 'bckSpc') {
        addValueToExp(value);
        value = 0
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
    for (let algObj of expression){
       $('#display').append(algObj.value);
    }
}

function appendValueToDom(char){ //the value is displayed as you'ring building it, so I made this seporate function to just show this
    console.log(char)
    $('#display').append(char)
}

function postExpression() {
    $.ajax({
        method: 'POST',
        url: '/calcHistory',
        data:{
            "expression": expression,
            "answer": 0
        }
    }).then((response) =>{
        console.log(response);
    }).catch((error) =>{
        alert(error);
    })
}
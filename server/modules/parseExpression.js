
// since this app allows for long expressions the server will need to understand how to execute the expression
// this function will be able to intake the expression from the client and create a three dimentional array that it can more easily understand

const { PassThrough } = require("stream");

// to say this is a horrifying piece of code is possibly an understatement, but I'm not sure of a better way to traverse this feature
function parseAndOrderExp(expressionObj) {
    let expression = expressionObj.expression;
    console.log(expression);
    // formulate new expression that the computer can simplay evaluate and return
    let parsedExp = [];
    //check if the whole expression contains any multiplication or division. if it does we can skip everything else. this can just be a flat array
    let nonPlusMinus = 0;    
    for (obj of expression) {
        if (obj.value === '/' || obj.value === 'x') {
            nonPlusMinus += 1;
        }
    }
    for (let i = 0; i < expression.length; i++) {
        if (nonPlusMinus === 0) {
            console.log('add/sub only');
            for (obj of expression) {
                parsedExp.push(obj.value)
            }
            return parsedExp; //leave if this condition is met
        } else if (expression[i].valType === 'operator') {
            console.log('add/sub and multi/div');
            // console.log(expression[i].value);
            if (expression[i].value === '/' || expression[i].value === 'x') {
                let minVal = 3
                if (i >= minVal ) { //this condition can only exist if another multiplication or division operator already was moved to the array
                                    // and also, if I ran the bellow condition at i = 1, i = -1 is undefined.         
                    if (expression[i-2].value === 'x' || expression[i-2].value === '/') { // checking if the nearby values are already added into the array
                        let step = parsedExp
                        step.push(expression[i].value); //add the operator to the array
                        step.push(expression[i+1].value); // add the nearyby integer to the array.
                        parsedExp = [step]
                    } else{
                        let step = []
                        step.push(expression[i - 1].value);
                        step.push(expression[i].value);
                        step.push(expression[i + 1].value);
                        parsedExp.push(step);
                    }
                } else {
                    // grab nearby values to operate on later putting them 
                    let step = []
                    step.push(expression[i - 1].value);
                    step.push(expression[i].value);
                    step.push(expression[i + 1].value);
                    parsedExp.push(step);
                }
                
            } else if (expression[i].value === '+' || expression[i].value === '-') {
                // default to concatnating add/subtract symbols if conditions above are not met
                let maxVal = expression.length - 1;
                if (expression[i-2].value === '+' || expression[i-2].value === '+') {
                    
                } else if (i + 1 === maxVal) { // if at end of expression push the operator plus integer
                    parsedExp.push(expression[i].value); 
                    parsedExp.push(expression[i+1].value);
                } else if (i = 1) {     // if at the begining of expression push the operator plus first integer
                    parsedExp.push(expression[i-1].value);
                    parsedExp.push(expression[i].value); 
                } else {                // if in the middle of the expression push the operator.
                    parsedExp.push(expression[i].value); 
                }
            }
        } 
    }
    // push/return expression
    console.log(parsedExp);
    return parsedExp;
}

module.exports = {
    function: parseAndOrderExp
}



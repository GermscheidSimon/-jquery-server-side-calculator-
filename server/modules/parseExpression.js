
// since this app allows for long expressions the server will need to understand how to execute the expression
// this function will be able to intake the expression from the client and create a three dimentional array that it can more easily understand
function parseAndOrderExp(expressionObj) {
    let expression = expressionObj.expression;
    // formulate new expression that the computer can simplay evaluate and return
    let parsedExp = [];
    // need to determine if multi or div operators will exist. If they don't the array will just need to be flat
    for (algObj of expression) {
        if (algObj.value === '/' || algObj.value === 'x') {
            for (let i = 0; i < expression.length; i++) { // this will parse long expressions containing mult/div opers
                let valType = expression[i].valType;
                if (valType === 'operator') {
                    if (exppression[i].value === '/' || exppression[i].value === 'x') {
                        if (expression[i-2].valType === 'opertor') { // checking if the nearby values are already added into the array
                            let step = []
                            step.push(expression[i]); //add the operator to the array
                            step.push(expression[i+1]); // add the nearyby integer to the array.
                        } else {
                            // grab nearby values to operate on later putting them 
                            let step = []
                            step.push(expression[i - 1].value);
                            step.push(expression[i].value);
                            step.push(expression[i + 1].value);
                            parsedExp.push(step);
                        }
                        
                    } else if (exppression[i].value === '+' || exppression[i].value === '-') {
                        parsedExp.push(exppression[i].value); // adding and subtracking operators can be added to the array directly. 
                    }
                }
            }
        } else {
            for (algObj of expression) {
                parsedExp.push(algObj.value);
            }
        }
    }
    // push/return expression
    return parsedExp;
}

module.exports = {
    function: parseAndOrderExp
}


function parseExp(){
    


    
}
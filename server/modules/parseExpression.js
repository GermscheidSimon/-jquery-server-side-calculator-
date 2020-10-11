let data = require('./calcHistory')

let newExpression = [];     // a copy of the data if needed
let workingExpression = []; // the 'stratch paper' for the computer as it iterates through the expression
let answer = 0;   
let iterations = 0;  // how many operators exist. this will determine how many times I must calculate
let multiDivOper = 0; // how many multiplication operators exist in the expression
// since this app allows for long expressions the server will need to understand how to execute the expression
// this function will be able to intake the expression from the client and create a three dimentional array that it can more easily understand

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}
function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}
function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}
function divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
}

function newestExpression() {
    if (data.array === []) {
        console.log('no expressions currently in memory');
        return;
    }
    newExpression = data.array[data.array.length - 1]; // set expression
    workingExpression = newExpression.expression; // set working form when running calculation
    for (let obj in workingExpression) {  // find any multiplication or division which need to be executed first
        if (workingExpression[obj].value === 'multiply' || workingExpression[obj].value === 'divide') {
            multiDivOper+=1
        }
        console.log('multiDiv', multiDivOper);
        
    }
    for (let obj in workingExpression) { // add up all operators in expression
        if (workingExpression[obj].valType === 'operator') {
            iterations += 1
        }
    }
    console.log('iterator', iterations);
    evaluateMultiDiv(workingExpression);
}

// this function will recursively solve for multiplication and division. it will solve left to right using the find() operator to locate any objects with a valType of Operation
// then it will execute a math function of the given type (multi or div), and then update the iterations and multiDivOper values. these values help us know how many
// items are left to complete for this function. 
function evaluateMultiDiv(arrayOfObjects){
    console.log(arrayOfObjects);
        let nextOperation = arrayOfObjects.indexOf(arrayOfObjects.find(({value}) => value === 'multiply' || value === 'divide'));
               if (arrayOfObjects[nextOperation].value === 'multiply' && multiDivOper > 0 && iterations > 0) {
                   console.log(arrayOfObjects[nextOperation]);
                    let newValu = multiply(arrayOfObjects[nextOperation-1].value, arrayOfObjects[nextOperation+1].value);
                    console.log(newValu);
                    arrayOfObjects.splice(arrayOfObjects -1, 3, ({
                        valType: 'integer',
                        value: newValu
                    })) //starting with the first number evaluated, remove 3 obj, and add new value
                    console.log(arrayOfObjects);
                    iterations -= 1;
                    console.log(iterations, 'iterations left');
                    multiDivOper -= 1;
                    console.log(multiDivOper, 'mult or Div left');
                    if (multiDivOper >= 1) {
                        evaluateMultiDiv(arrayOfObjects); // re-run the function if there are still multiplication or division operators in the expression
                    } else if (iterations >= 1) {
                        evaluateAddSub(arrayOfObjects); // if there are still iterations left that means we still need to sovle for +  and - 
                    } else if (iterations === 0) {
                        return arrayOfObjects;  // if the expression contained no addition or subtraction, return the value left in the array.
                    }
            } else if (arrayOfObjects[nextOperation].value === 'divide' && multiDivOper > 0 && iterations > 0) {
                    let newValu = divide(arrayOfObjects[nextOperation-1].value, arrayOfObjects[nextOperation+1].value);
                arrayOfObjects.splice(nextOperation-1, 3, ({
                    valType: 'integer',
                    value: newValu
                })); //starting with the first number evaluated, remove 3 obj, and add new value
                iterations -= 1;
                multiDivOper -= 1;
                console.log(arrayOfObjects);
                if (multiDivOper >= 1) {
                    evaluateMultiDiv(arrayOfObjects);
                } else if (iterations >= 1) {
                    evaluateAddSub(arrayOfObjects);
                } else if (iterations === 0) {
                    console.log('final answer', arrayOfObjects);
                    return arrayOfObjects;
                }
        }
}
function evaluateAddSub(arrayOfObjects) {
    let nextOperation = arrayOfObjects.indexOf(arrayOfObjects.find(({value}) => value === 'add' || value === 'subtrack'));
    if (arrayOfObjects[nextOperation].value === 'subtract' && iterations > 0) {
         let newValu = subtract(arrayOfObjects[nextOperation-1].value, arrayOfObjects[nextOperation+1].value);
         arrayOfObjects.splice(nextOperation-1, 3, ({
             valType: 'integer',
             value: newValu
         })); //starting with the first number evaluated, remove 3 obj, and add new value
         iterations -= 1;
         if (iterations > 0) {
             evaluateAddSub(arrayOfObjects);
         } else {
           return arrayOfObjects;
        }  
    }else if (arrayOfObjects[nextOperation].value === 'add' && iterations > 0) {
        let newValu = add(arrayOfObjects[nextOperation-1].value, arrayOfObjects[nextOperation+1].value);
        arrayOfObjects.splice(nextOperation-1, 3, ({
            valType: 'integer',
            value: newValu
        })); //starting with the first number evaluated, remove 3 obj, and add new value
        iterations -= 1;
        if (iterations > 0) {
            evaluateAddSub(arrayOfObjects);
        }else {
            console.log(arrayOfObjects);
            return arrayOfObjects;
        }
    }
}

// // to say this is a horrifying piece of code is possibly an understatement, but I'm not sure of a better way to traverse this feature
// function parseAndOrderExp(expressionObj) {
//     let expression = expressionObj.expression;
//     console.log(expression);
//     // formulate new expression that the computer can simplay evaluate and return
//     let parsedExp = [];
//     //check if the whole expression contains any multiplication or division. if it does we can skip everything else. this can just be a flat array
//     let nonPlusMinus = 0;    
//     for (obj of expression) {
//         if (obj.value === '/' || obj.value === 'x') {
//             nonPlusMinus += 1;
//         }
//     }
//     for (let i = 0; i < expression.length; i++) {
//         if (nonPlusMinus === 0) {
//             console.log('add/sub only');
//             for (obj of expression) {
//                 parsedExp.push(obj.value)
//             }
//             return parsedExp; //leave if this condition is met
//         } else if (expression[i].valType === 'operator') {
//             console.log('add/sub and multi/div');
//             // console.log(expression[i].value);
//             if (expression[i].value === '/' || expression[i].value === 'x') {
//                 let minVal = 3
//                 if (i >= minVal ) { //this condition can only exist if another multiplication or division operator already was moved to the array
//                                     // and also, if I ran the bellow condition at i = 1, i = -1 is undefined.         
//                     if (expression[i-2].value === 'x' || expression[i-2].value === '/') { // checking if the nearby values are already added into the array
//                         let step = parsedExp
//                         step.push(expression[i].value); //add the operator to the array
//                         step.push(expression[i+1].value); // add the nearyby integer to the array.
//                         parsedExp = [step]
//                     } else{
//                         let step = []
//                         step.push(expression[i - 1].value);
//                         step.push(expression[i].value);
//                         step.push(expression[i + 1].value);
//                         parsedExp.push(step);
//                     }
//                 } else {
//                     // grab nearby values to operate on later putting them 
//                     let step = []
//                     step.push(expression[i - 1].value);
//                     step.push(expression[i].value);
//                     step.push(expression[i + 1].value);
//                     parsedExp.push(step);
//                 }
                
//             } else if (expression[i].value === '+' || expression[i].value === '-') {
//                 // default to concatnating add/subtract symbols if conditions above are not met
//                 let maxVal = expression.length - 1;
//                 if (expression[i-2].value === '+' || expression[i-2].value === '+') {
                    
//                 } else if (i + 1 === maxVal) { // if at end of expression push the operator plus integer
//                     parsedExp.push(expression[i].value); 
//                     parsedExp.push(expression[i+1].value);
//                 } else if (i = 1) {     // if at the begining of expression push the operator plus first integer
//                     parsedExp.push(expression[i-1].value);
//                     parsedExp.push(expression[i].value); 
//                 } else {                // if in the middle of the expression push the operator.
//                     parsedExp.push(expression[i].value); 
//                 }
//             }
//         } 
//     }
//     // push/return expression
//     console.log(parsedExp);
//     return parsedExp;
// }



module.exports = {
    getData: newestExpression,
    data: answer
}
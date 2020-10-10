
function parseAndOrderExp(expressionObj) {
    console.log('hello from parse fnc', expressionObj);
    let expression = expressionObj.expression;
    // formulate new expression that the computer can simplay evaluate and return
    for (let AlgObj of expression) {
        console.log(AlgObj.valType);
    }
    // push/return expression
}

module.exports = {
    function: parseAndOrderExp
}
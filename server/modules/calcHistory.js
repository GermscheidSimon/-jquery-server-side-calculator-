let calcHistoryArray = [];
function newestExpression() {
    if (calcHistoryArray === []) {
        console.log('no expressions currently in memory');
        return;
    }
    let newExpression = calcHistoryArray[calcHistoryArray.length - 1];
    return newExpression
}

module.exports = {
    array: calcHistoryArray,
    newExp: newestExpression
}
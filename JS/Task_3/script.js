function rememberArgs() {
    var arr = [];
    return function () {
        var innerArr = arr;
        if (arguments.length === 0) {
            return innerArr;
        } else {
            for (var i = 0; i < arguments.length; i++) {
                innerArr.push(arguments[i]);
            }
        }
    }
}

var generateArgumentsArray = rememberArgs();

generateArgumentsArray(3, 4);
generateArgumentsArray(5, 'String');
generateArgumentsArray({firstName: 'bob', lastName: 'bob2'});

console.log(generateArgumentsArray());





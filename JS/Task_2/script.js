// Factorial

function fact(n) {
    if (n <= 1) {
        return 1
    } else {
        return n * fact(n - 1)
    }
}

console.log(fact(5)); // Вычислить факториал 5

// Fibonacci

function Fib(number) {
    var arr = [0, 1];
    var arrEl;
    for (var i = 2; i < number; i++) {
        if (number > 2) {
            arrEl = arr[i - 1] + arr[i - 2];
            arr.push(arrEl);
        } else {
            return arr;
        }
    }
    return arr;
}

console.log(Fib(10)); // Сгенерировать массив из 10 чисел фибоначи

// Simple Numbers
// generate Array of simple numbers. number is amount of array
function generatePrimeNumbersArray(number) {
    var primeNumbersArray = [];
    var currentStep = 2;
    var i;
    next:
        while (primeNumbersArray.length < number) {
            while (true) {
                i = currentStep;
                currentStep = i + 1;
                for (var j = 2; j < i; j++) {
                    if (i % j === 0) continue next;
                }
                primeNumbersArray.push(i);
                continue next;
            }
        }
    return primeNumbersArray;
}


console.log(generatePrimeNumbersArray(10)); // Сгенерировать массив из 10 простых чисел
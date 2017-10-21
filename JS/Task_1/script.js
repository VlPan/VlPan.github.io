console.log("1" + 2 + 0); // 2 -> "2", 0 -> "0". Output:"120"
console.log("1" - 1 + 2); // "1" -> 1. Output: 2
console.log(true + false); // true -> 1, false -> 0. Output: 1
console.log(10 / "5"); // "5" -> 5. Output: 2
console.log("2" * "3"); // "2" -> 2, "3" -> 3. Output: 6
console.log(4 + 5 + "px"); // 4 + 5 = 9, 9 -> "9". Output: "9px"
console.log("$" + 4 + 5); // 4 -> "4", 5 -> "5". Output: "$45"
console.log("42" - 2); // "42" -> 42. Output: 40
console.log("4px" - 2); // "4px" -> NaN. Output: NaN
console.log(7 / 0); // Output: Infinity
console.log("  -9\n" + 5); // 5 -> "5". Output: " -9<new line>5"
console.log("  -9\n" - 5); // "-9" -> -9. Output: -14
console.log(5 && 2); // 5 -> true, 2 -> true. Output: 2
console.log(2 && 5); // 5 -> true, 2 -> true. Output: 5
console.log(5 || 0); // (true || false) -> true. Output: 5
console.log(0 || 5); // (false || true) -> true. Output: 5
console.log(null + 1); // null -> 0. Output: 1
console.log(undefined + 1); // undefined -> NaN. Output: NaN
console.log(null == "\n0\n"); // equal null == "0". null only coerces to undefined ( null==undefined // true)// null -> undefined. (undefined == 0). Output: false
console.log(+null == +"\n0\n"); // +null -> 0, "0" and +"0" both -> 0. Output: true

var a = 2;
console.log(a = a+++a++); // -1
console.log(a); // -1









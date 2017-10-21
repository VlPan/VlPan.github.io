## Task 3 - functions and Scopes

```javascript
function rememberArgs() {
  // return callback (n!)
}
```
```javascript
var generateArgumentsArray = rememberArgs();
  // callback from rememberArgs that remember and generate array of args
```

```javascript
generateArgumentsArray(3,4);
generateArgumentsArray(5, 'String');

generateArgumentsArray(); // [3,4,5,'String']
```
## Task 4 - functional and prototype inheritance

```javascript
// Make models
var CarModel = function (name, long, width, height)
var AudiA4 = new CarModel('Audi A4', 4726, 1842, 1427);
```
```javascript
// Make manufacturer
var Manufacturer = function (name, foundationYear)
var Audi = new Manufacturer('Audi', 1930)
```

```javascript
// Set models of manufacturer
Audi.setModels([AudiA4]);
```

```javascript
// Make new instance of car with Audi manufacturer
var car1 = new Car(Audi, 2001);
// Models of this car should be in Audi manufacturer models array. 
car1.setModel(AudiA4);
```

```javascript
//  INHERITANCE
var JeepCar = function () {
    Car.apply(this, arguments);
    this.TYPE = 'jeep';
}

JeepCar.prototype = Object.create(Car.prototype);
JeepCar.prototype.constructor = JeepCar;

JeepCar.prototype.getType = function () {
    return this.TYPE;
}
```

```javascript
// Use new Instance
jeep.setModel(NissanJuke);
jeep.getModel();
jeep.move();
jeep.getType();
```
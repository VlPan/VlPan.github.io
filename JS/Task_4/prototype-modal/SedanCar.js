var SedanCar = function () {
    Car.apply(this, arguments);
    this.TYPE = 'sedan';
}

SedanCar.prototype = Object.create(Car.prototype);
SedanCar.prototype.constructor = SedanCar;

SedanCar.prototype.getType = function () {
    return this.TYPE;
}





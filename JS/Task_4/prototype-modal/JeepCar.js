var JeepCar = function () {
    Car.apply(this, arguments);
    this.TYPE = 'jeep';
}

JeepCar.prototype = Object.create(Car.prototype);
JeepCar.prototype.constructor = JeepCar;

JeepCar.prototype.getType = function () {
    return this.TYPE;
}
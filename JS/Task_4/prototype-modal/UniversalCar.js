var UnversalCar = function () {
    Car.apply(this, arguments);
    this.TYPE = 'universal';
}

UnversalCar.prototype = Object.create(Car.prototype);
UnversalCar.prototype.constructor = UnversalCar;

UnversalCar.prototype.getType = function () {
    return this.TYPE;
}
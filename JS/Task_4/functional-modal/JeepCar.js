var JeepCar = function () {
    Car.apply(this, arguments);
    var TYPE = 'jeep';

    this.getType = function () {
        return TYPE;
    }
}
var SedanCar = function () {
    Car.apply(this, arguments);
    var TYPE = 'sedan';

    this.getType = function () {
        return TYPE;
    }
}
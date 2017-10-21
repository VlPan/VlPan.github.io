var UnversalCar = function () {
    Car.apply(this, arguments);
    var TYPE = 'universal';

    this.getType = function () {
        return TYPE;
    }
}
var Car = function (manufacturer, releaseYear) {
    this.manufacturer = manufacturer;
    this.releaseYear = releaseYear;
};

Car.prototype.setModel = function (model) {
    if(this.manufacturer.getModels().indexOf(model) !== -1 && model instanceof CarModel){
        return this.model = model;
    }
    else{
        throw new Error('Manufacturer ' + this.manufacturer.name + ' has no model like this');
    }
}

Car.prototype.getModel = function () {
    return this.model;
}

Car.prototype.move = function () {
    return 'The car is moving'
}
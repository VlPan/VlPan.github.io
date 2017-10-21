var Manufacturer = function (name, foundationYear) {
    this.name = name;
    this.foundationYear = foundationYear;
    this.models = [];

};

Manufacturer.prototype.addModel = function (model) {
    if(model instanceof CarModel)  this.models.push(model);
};

Manufacturer.prototype.setModels = function (modelsToAdd) {
    var filteredModels = modelsToAdd.filter(function (model) {
               return model instanceof CarModel
    });
    this.models = filteredModels;
};

Manufacturer.prototype.getModels = function () {
    return this.models;
}

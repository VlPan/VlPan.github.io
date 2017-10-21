var Manufacturer = function (name, foundationYear) {
    this.name = name;
    this.foundationYear = foundationYear;
    var models = [];

    this.addModel = function(model){
        if(model instanceof CarModel)  models.push(model);
    };
    
    this.setModels = function (modelsToAdd) {
        var filteredModels = modelsToAdd.filter(function (model) {
            return model instanceof CarModel
        });
        models = filteredModels;
    }
    
    this.getModels = function () {
        return models;
    };
};


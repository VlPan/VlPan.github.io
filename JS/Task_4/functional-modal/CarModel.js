var CarModel = function (name, long, width, height) {
    this.name = name;
    this.long = long;
    this.width = width;
    this.height = height;

    this.getInfo = function () {
        return `Name is ${this.name}, Long is ${this.long}, Width is ${this.width} and height is ${this.height}`;
    }
}
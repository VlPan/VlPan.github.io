// Make models
var AudiA4 = new CarModel('Audi A4', 4726, 1842, 1427);
var AudiA5 = new CarModel('Audi A5', 4733, 1843, 1388);
var AudiA6 = new CarModel('Audi A6', 4933, 1874, 1455);
var NissanJuke = new CarModel('Nissan Juke', 4135, 1765, 1565);
var NissanKicks = new CarModel('Nissan Kicks', 4295, 1760, 1590);

// We can get info about instance of CarModel
console.log(AudiA6.getInfo());
// Make manufacturer
var Audi = new Manufacturer('Audi', 1930);
// Set models of manufacturer
Audi.setModels([AudiA4, AudiA5, AudiA6]);

var Nissan = new Manufacturer('Nissan', 925);
// Set models of manufacturer
Nissan.setModels([NissanJuke, NissanKicks]);
// log them
console.log(Nissan.getModels());

// Make new instance of car with Audi manufacturer
var car1 = new Car(Audi, 2001);
// Models of this car should be in Audi manufacturer models array. Or the line under will give an error
car1.setModel(AudiA4);

// get model of instance
console.log(car1.getModel());
// Make a move
console.log(car1.move());

var sedan = new SedanCar(Audi, 2008);
sedan.setModel(AudiA5);
console.log(sedan.getModel());
console.log(sedan.move());
console.log(sedan.getType());

var jeep = new JeepCar(Nissan, 2008);
jeep.setModel(NissanJuke);
console.log(jeep.getModel());
console.log(jeep.move());
console.log(jeep.getType());

var universal = new UnversalCar(Nissan, 2010);
universal.setModel(NissanKicks);
console.log(universal.getModel());
console.log(universal.move());
console.log(universal.getType());








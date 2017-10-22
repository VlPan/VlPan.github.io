var Mission = function(name, points){
    this.name = name;
    this.points =  points;
    this.date = new Date();
    this.day = this.date.getDay();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.hours = this.date.getHours();
}
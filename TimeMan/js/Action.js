var Action = function(name, importance,minutes,points){
    this.name = name;
    this.importance =  importance;
    this.minutes = minutes || 0;
    this.points = points || 0;
}


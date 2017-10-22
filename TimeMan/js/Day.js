
var Day = function(points,history,missionHistory){
    this.points = points || 0;
    this.history = history || [];
    this.date = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
    this.missionHistory = missionHistory || [];
}
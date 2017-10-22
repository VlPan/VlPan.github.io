var StopWatch = function(elem){

    var interval;
    var offset;
    var time = 0;


    this.isOn = false;
    var update = function(){
        time += delta();
        var formattedTime = timeFormatter(time);
        elem.textContent = formattedTime;
    };
    var delta = function(){
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    };
    var timeFormatter = function(timeMillSeconds){
        var time = new Date(timeMillSeconds);
        var hours = time.getUTCHours().toString();
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var millSeconds = time.getMilliseconds().toString();

        if(hours.length < 2){
            hours = "0" + hours;
        }

        if(minutes.length < 2){
            minutes = "0" + minutes;
        }
        if(seconds.length < 2){
            seconds = "0" + seconds;
        }
        while(millSeconds.length < 3){
            millSeconds = "0" + millSeconds;
        }

        return hours + " . " + minutes + " . " + seconds +" . "+ millSeconds;
    };

    this.stop = function(){
        if(this.isOn){
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };
    this.reset = function(){

            time = 0;
            elem.textContent= "00 . 00 . 00 . 000";
    };
    this.start = function(){
        if(!this.isOn){
            interval = setInterval(update,10);
            offset = Date.now();
            this.isOn = true;
        }
    };
}
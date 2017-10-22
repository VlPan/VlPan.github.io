
var dayEls = document.getElementsByClassName("day");
var daysList = document.getElementById("days");
var ulHistory = document.getElementsByClassName("ul-history");
var dayDescription = document.getElementsByClassName("day_description");
var pointsForDay = document.getElementById("points_for_day");


function unhide(number){
    dayDescription[number].classList.toggle("hide");
}

function fetchDays(){
    var days = JSON.parse(localStorage.getItem("days"));
    pointsForDay.textContent = Math.round(days[days.length - 1].points);
    dayEls.innerHTML = '';
    days.reverse();

    for (var i = 0; i < days.length; i++) {


        var date = days[i].date;
        var points = Math.round(days[i].points);
        var history = days[i].history.reverse();
        var missionHistory = days[i].missionHistory.reverse();
        console.log(missionHistory);
        var year = date[0];
        var month = date[1];
        var day = date[2];

        if(month < 9){
            month = "0" + month;
        }
        if(day < 9){
            day = "0" + day;
        }

        daysList.innerHTML +=
            '<div class="day well" onclick="unhide(\'' + i + '\')">' +
            ' Дата: <span id="date">'
            + day + "." + month + "." + year +
            '</span>' +
            ' Очки: <span id="points">' + points + '</span>' +
            '</div>';

        daysList.innerHTML += '<div class="day_description hide" data-columns="' + i + '"> ' +
            '<ul class="ul-history"> </ul> </div>';

        for(var y = 0; y < history.length; y++){
            if( y === 0){
                ulHistory[i].innerHTML = '';
            }
            ulHistory[i].innerHTML += '<li>' + history[y] + '</li>';
        }

        for(var y2 = 0; y2 <  missionHistory.length; y2++){

            ulHistory[i].innerHTML += '<li> <span class="mission">' + "< mission >" +'</span>' + missionHistory[y2] + '</li>';
        }
    }




 // <div class="day well">Дата: <span id="date">28.07.2017</span> Очки: <span id="points">980</span></div>
 //         <div class="day_description hide">
 //         <ul>
 //        <li>WedDesign</li> <li>JS</li>
 //        </ul>
 //         </div>
}
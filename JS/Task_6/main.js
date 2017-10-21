var timeInfo = myTime.getTimeInfo();

var arr = myTime.generateArrayOfDaysByMonth(timeInfo.currentMonth, timeInfo.currentYear);


var body = document.querySelector('body');
var node = render.renderDatePicker(arr);
body.appendChild(node);

var prev = document.querySelector('.w10-calendar__prev-month');
var next = document.querySelector('.w10-calendar__next-month');
var partForRerender = document.querySelector('.w10-calendar__container');
var navigationDate = document.querySelector('.w10-calendar__month-year');


prev.addEventListener('click', function (event) {
    var oldNode = event.target.parentNode.parentNode.parentNode.children[2];

    timeInfo.currentMonth--;

    if (timeInfo.currentMonth === -1) {
        timeInfo.currentMonth = 11;
        timeInfo.currentYear--;
    }

    navigationDate.textContent = timeInfo.currentDate + '.' + (timeInfo.currentMonth + 1 <= 9 ? '0' : '') + (timeInfo.currentMonth + 1) + '.' + timeInfo.currentYear;
    var arr = myTime.generateArrayOfDaysByMonth(timeInfo.currentMonth, timeInfo.currentYear);

    partForRerender.removeChild(oldNode);
    var node = render.renderOnlyDays(arr);

    partForRerender.appendChild(node);

});


next.addEventListener('click', function (event) {
    var oldNode = event.target.parentNode.parentNode.parentNode.children[2];

    timeInfo.currentMonth++;

    if (timeInfo.currentMonth === 12) {
        timeInfo.currentMonth = 0;
        timeInfo.currentYear++;
    }

    navigationDate.textContent = timeInfo.currentDate + '.' + (timeInfo.currentMonth + 1 <= 9 ? '0' : '') + (timeInfo.currentMonth + 1) + '.' + timeInfo.currentYear;
    var arr = myTime.generateArrayOfDaysByMonth(timeInfo.currentMonth, timeInfo.currentYear);

    partForRerender.removeChild(oldNode);
    var node = render.renderOnlyDays(arr);
    partForRerender.appendChild(node);
});





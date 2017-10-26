function DatePicker() {
    this.daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    this.currentDate = new Date();
    this.monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    this.prevDays = [];
    this.nextDays = [];
}

DatePicker.prototype.generateArrayOfDaysByMonth = function (month, year) {

    if (month >= 12) month = 11;
    if (month <= -1) month = 0;
    var arrayOfDaysInMonth = this.getDaysInMonth(month, year);
    var arrOfNextMonthDays, arrOfPrevMonthDays, validNextMonth, validPrevMonth;
    ( month + 1 ) >= 12 ? validNextMonth = 0 : validNextMonth = month + 1;
    ( month - 1 ) <= -1 ? validPrevMonth = 12 : validPrevMonth = month - 1;

    var firstDay = arrayOfDaysInMonth[0].getDay();
    var lastDay = arrayOfDaysInMonth[arrayOfDaysInMonth.length - 1].getDay();


    if (firstDay === 0) {
        arrOfPrevMonthDays = this.getLastDaysInMonth(validPrevMonth, year, 6);
        this.prevDays = arrOfPrevMonthDays;
    }
    else if (firstDay === 1) {
        arrOfPrevMonthDays = [];
    }
    else {
        arrOfPrevMonthDays = this.getLastDaysInMonth(validPrevMonth, year, firstDay - 1);
        this.prevDays = arrOfPrevMonthDays;
    }
    if (lastDay !== 0) {
        arrOfNextMonthDays = this.getFirstDaysInMonth(validNextMonth, year, 7 - lastDay);
        this.nextDays = arrOfNextMonthDays;
    } else {
        arrOfNextMonthDays = this.getFirstDaysInMonth(validNextMonth, year);
        this.nextDays = arrOfNextMonthDays;
    }

    return arrOfPrevMonthDays.concat(arrayOfDaysInMonth, arrOfNextMonthDays);
};

DatePicker.prototype.transformArrOfDates = function (arrOfDates) {
    return arrOfDates.map(function (d) { return d.getDate()});
}

DatePicker.prototype.getDaysInMonth = function (month, year) {


        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
};
DatePicker.prototype.getLastDaysInMonth = function (month, year, number) {

        var arrayOfDaysInMonth = this.getDaysInMonth(month, year);
        if (number > arrayOfDaysInMonth.length) {
            number = arrayOfDaysInMonth.length;
        }
        return arrayOfDaysInMonth.splice(-number);
};

DatePicker.prototype.getFirstDaysInMonth = function (month, year, number) {

    var arrayOfDaysInMonth = this.getDaysInMonth(month, year);
    if (number > arrayOfDaysInMonth.length) {
        number = arrayOfDaysInMonth.length;
    }
    return arrayOfDaysInMonth.splice(0, number);
};






/**
 * Module myTime create at 21.10.2017 by VlPan.
 */

var myTime = (function () {

    return {

        getTimeInfo: function () {
            var date = new Date();
            var currentDate = date.getDate();
            var currentDay = date.getDay();
            var currentMonth = date.getMonth();
            var currentYear = date.getFullYear();
            return {
                currentDate: currentDate,
                currentDay: currentDay,
                currentYear: currentYear,
                currentMonth: currentMonth
            }
        },

        getDaysInMonth: function (month, year) {
            /**
             * @param {int} The month number, 0 based
             * @param {int} The year, not zero based, required to account for leap years
             * @return {Date[]} List with date objects for each day of the month
             */

            var date = new Date(year, month, 1);
            var days = [];
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        },

        getLastDaysInMonth: function (month, year, number) {
            /**
             * @param {int} The month number, 0 based
             * @param {int} The year, not zero based, required to account for leap years
             * @param {int} The number of days to return, can't be more than number of all days in Month
             * @return {Date[]} List with date objects for each day of the month
             */


            var arrayOfDaysInMonth = this.getDaysInMonth(month, year);
            if (number > arrayOfDaysInMonth.length) {
                number = arrayOfDaysInMonth.length;
            }
            return arrayOfDaysInMonth.splice(-number);
        },

        getFirstDaysInMonth: function (month, year, number) {
            /**
             * @param {int} The month number, 0 based
             * @param {int} The year, not zero based, required to account for leap years
             * @param {int} The number of days to return, can't be more than number of all days in Month
             * @return {Date[]} List with date objects for each day of the month
             */


            var arrayOfDaysInMonth = this.getDaysInMonth(month, year);
            if (number > arrayOfDaysInMonth.length) {
                number = arrayOfDaysInMonth.length;
            }
            return arrayOfDaysInMonth.splice(0, number);
        },

        generateArrayOfDaysByMonth: function (month, year) {
            /**
             * @param {int} The month number, 0 based
             * @param {int} The year, not zero based, required to account for leap years
             * @param {int} The number of days to return, if more than day of month than it will get days from previous and future month
             * @return {Date[]} List with date objects for each day of the month
             */


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
            }
            else if (firstDay === 1) {
                arrOfPrevMonthDays = [];
            }
            else {
                arrOfPrevMonthDays = this.getLastDaysInMonth(validPrevMonth, year, firstDay - 1);
            }
            if (lastDay !== 0) {
                arrOfNextMonthDays = this.getFirstDaysInMonth(validNextMonth, year, 7 - lastDay);
            } else {
                arrOfNextMonthDays = this.getFirstDaysInMonth(validNextMonth, year);
            }


            return arrOfPrevMonthDays.concat(arrayOfDaysInMonth, arrOfNextMonthDays);

        },

        getDatesFromDateObjects: function (arrOfDateObject) {
            /**
             * @param {Date[]} List with date objects for each day of the month + dates from prevMonth and nextMonth
             * @return {int[]} List with date of each object
             */

            return arrOfDateObject.map(function (dateObj) {
                return dateObj.getDate()
            })
        }
    }
})();








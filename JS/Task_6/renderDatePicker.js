var render = (function () {
    var currentDate = new Date();

    var createElement = function (type, styleArr, textContent) {
        var DOMObject = document.createElement(type);
        for (var i = 0; i < styleArr.length; i++) {
            DOMObject.classList.add(styleArr[i]);
        }
        DOMObject.textContent = textContent;
        return DOMObject
    }

    return {
        /**
         * Function render array of dates
         * @param arrOfDates {int[]} Array with dates
         * @param currentDate {int} Array with dates
         */
        renderDatePicker: function (arrOfDates) {
            var days = ['MO', 'TO', 'WE', 'TH', 'FR', 'SA', 'SU'];
            var arrDatePointer = 0;
            var notInMonth = arrOfDates[0].getDate() !== 1;
            var rows = Math.floor(arrOfDates.length / 7);

            var calendar = createElement('div', ['w10-calendar', 'w10-calendar--small-width']);
            var calendarContainer = createElement('div', ['w10-calendar__container']);
            var calendarManagePanel = createElement('div', ['w10-calendar__manage-panel']);
            var calendarMonthYear = createElement('div', ['w10-calendar__month-year'],
                currentDate.getDate() + '.' + (currentDate.getMonth() <= 8 ? '0' : '') + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear());
            var calendarControl = createElement('div', ['w10-calendar__control']);
            var calendarPrevMonth = createElement('div', ['w10-calendar__prev-month'], '<');
            var calendarNextMonth = createElement('div', ['w10-calendar__next-month'], '>');
            var calendarDaysOfWeek = createElement('div', ['w10-calendar__days-of-week']);
            var calendarDay;
            var calendarDays = createElement('div', ['w10-calendar__days']);
            var calendarRow;


            // Structure
            for (var i = 0; i < days.length; i++) {
                calendarDay = createElement('div', ['w10-calendar__day'], days[i]);
                calendarDaysOfWeek.appendChild(calendarDay);
            }


            for (var i = 0; i < rows; i++) {
                calendarRow = createElement('div', ['w10-calendar__row']);
                calendarDays.appendChild(calendarRow);
            }

            for (var i = 0; i < rows; i++) {
                for (var y = 0; y < 7; y++) {
                    if (notInMonth === true) {
                        calendarDay = createElement('div', ['w10-calendar__day', 'w10-calendar__day--not-present']
                            , arrOfDates[arrDatePointer].getDate());
                        if (arrOfDates[arrDatePointer].getDate() === currentDate.getDate() &&
                            arrOfDates[arrDatePointer].getMonth() === currentDate.getMonth() &&
                            arrOfDates[arrDatePointer].getFullYear() === currentDate.getFullYear()) {
                            calendarDay.classList.add('w10-calendar__day--TODAY');
                        }
                    }
                    else {
                        calendarDay = createElement('div', ['w10-calendar__day'], arrOfDates[arrDatePointer].getDate());
                        if (arrOfDates[arrDatePointer].getDate() === currentDate.getDate() &&
                            arrOfDates[arrDatePointer].getMonth() === currentDate.getMonth() &&
                            arrOfDates[arrDatePointer].getFullYear() === currentDate.getFullYear()) {
                            calendarDay.classList.add('w10-calendar__day--TODAY');
                        }
                    }
                    calendarDays.children[i].appendChild(calendarDay)

                    arrDatePointer++;
                    if (arrOfDates[arrDatePointer]) {
                        if (arrOfDates[arrDatePointer].getDate() === 1) notInMonth = !notInMonth;
                    }

                }
            }


            calendarControl.appendChild(calendarPrevMonth);
            calendarControl.appendChild(calendarNextMonth);
            calendarManagePanel.appendChild(calendarMonthYear);
            calendarManagePanel.appendChild(calendarControl);
            calendarContainer.appendChild(calendarManagePanel);
            calendarContainer.appendChild(calendarDaysOfWeek);
            calendarContainer.appendChild(calendarDays);
            calendar.appendChild(calendarContainer);

            return calendar;
        },

        renderOnlyDays: function (arrOfDates) {
            var notInMonth = arrOfDates[0].getDate() !== 1;
            var rows = Math.floor(arrOfDates.length / 7);

            var arrDatePointer = 0;
            var calendarDays = createElement('div', ['w10-calendar__days']);
            var calendarDay;
            var calendarRow;

            for (var i = 0; i < rows; i++) {
                calendarRow = createElement('div', ['w10-calendar__row']);
                calendarDays.appendChild(calendarRow);

            }

            for (var i = 0; i < rows; i++) {
                for (var y = 0; y < 7; y++) {
                    if (notInMonth === true) {
                        calendarDay = createElement('div', ['w10-calendar__day', 'w10-calendar__day--not-present']
                            , arrOfDates[arrDatePointer].getDate());


                        if (arrOfDates[arrDatePointer].getDate() === currentDate.getDate() &&
                            arrOfDates[arrDatePointer].getMonth() === currentDate.getMonth() &&
                            arrOfDates[arrDatePointer].getFullYear() === currentDate.getFullYear()) {
                            calendarDay.classList.add('w10-calendar__day--TODAY');
                        }
                    }
                    else {
                        calendarDay = createElement('div', ['w10-calendar__day'], arrOfDates[arrDatePointer].getDate());
                        if (arrOfDates[arrDatePointer].getDate() === currentDate.getDate() &&
                            arrOfDates[arrDatePointer].getMonth() === currentDate.getMonth() &&
                            arrOfDates[arrDatePointer].getFullYear() === currentDate.getFullYear()) {
                            calendarDay.classList.add('w10-calendar__day--TODAY');
                        }
                    }
                    calendarDays.children[i].appendChild(calendarDay)

                    arrDatePointer++;
                    if (arrOfDates[arrDatePointer]) {
                        if (arrOfDates[arrDatePointer].getDate() === 1) notInMonth = !notInMonth;
                    }

                }
            }

            return calendarDays;
        }

    }

})();

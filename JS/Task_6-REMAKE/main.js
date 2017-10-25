var renderer = new Renderer();
var datePicker = new DatePicker();

var daysObjects = datePicker.generateArrayOfDaysByMonth(datePicker.currentDate.getMonth() - 1,
    datePicker.currentDate.getFullYear());


var component = renderer.create({
    tag: 'div',
    classes: ['w10-calendar', 'w10-calendar--small-width'],
    childrens: [
        {
            tag: 'div',
            classes: 'w10-calendar__container',
            childrens: [
                {
                    tag: 'div',
                    classes: 'w10-calendar__header',
                    childrens: [
                        {
                            tag: 'h2',
                            classes: 'w10-calendar__timer',
                            textContent: (datePicker.currentDate.getHours() <= 9 ? '0' + datePicker.currentDate.getHours() : datePicker.currentDate.getHours()) +
                            ':' + (datePicker.currentDate.getMinutes() <= 9 ? '0' + datePicker.currentDate.getMinutes() : datePicker.currentDate.getMinutes())
                        },
                        {
                            tag: 'h3',
                            classes: 'w10-calendar__date',
                        }
                    ]
                },
                {
                    tag: 'hr',
                    classes: 'w10-calendar__hr'
                },
                {
                    tag: 'div',
                    classes: 'w10-calendar__manage-panel',
                    childrens: [
                        {
                            tag: 'div',
                            classes: 'w10-calendar__month-year',
                            textContent: datePicker.monthNames[datePicker.pickedMonth] + ' ' + datePicker.pickedYear
                        },
                        {
                            tag: 'div',
                            classes: 'w10-calendar__control',
                            childrens: [
                                {
                                    tag: 'div',
                                    classes: 'w10-calendar__prev-month',
                                    textContent: ' < ',
                                    eventHandlers: {
                                        'onclick': "test('PrevMonth')"
                                    }
                                },
                                {
                                    tag: 'div',
                                    classes: 'w10-calendar__next-month',
                                    textContent: ' > ',
                                    eventHandlers: {
                                        'onclick': "test('NextMonth')"
                                    }

                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    classes: 'w10-calendar__days-of-week',
                    childrens: renderer.createElementsWithDifferentContext({
                        tag: 'div',
                        classes: 'w10-calendar__day'
                    }, datePicker.daysOfWeek)
                },
                {
                    tag: 'div',
                    classes: 'w10-calendar__days',
                    childrens: renderer.createElementsWithDifferentContext({
                        tag: 'div',
                        classes: ['w10-calendar__day']
                    }, daysObjects, 'getDate', [
                        {
                            styleClass: 'w10-calendar__day--TODAY',
                            condition: 'arrOfContext[index].getDate() ===' + datePicker.currentDate.getDate() + '&&' + 'arrOfContext[index].getMonth()+1 ===' + datePicker.currentDate.getMonth()
                        },
                        {
                            styleClass: 'w10-calendar__day--not-present',
                            condition: 'index<' + datePicker.prevDays.length
                        },
                        {
                            styleClass: 'w10-calendar__day--not-present',
                            condition: 'index>=' + (daysObjects.length - datePicker.nextDays.length)
                        }
                    ])
                },
                {
                    tag: 'hr',
                    classes: 'w10-calendar__hr'
                },
                {
                    tag: 'div',
                    classes: 'w10-calendar__events',
                    childrens: [
                        {
                            tag: 'div',
                            classes: 'w10-calendar__flex',
                            childrens: [
                                {
                                    tag: 'h2',
                                    classes: 'w10-calendar__today',
                                    textContent: 'Сегодня'
                                },
                                {
                                    tag: 'h3',
                                    classes: 'w10-calendar__add-event',
                                    textContent: '+'
                                }
                            ]
                        },
                        {
                            tag: 'h3',
                            classes: 'w10-calendar__some-events',
                            textContent: 'Нет событий'
                        }
                    ]
                }
            ]
        }
    ]
});
renderer.render(component, 'body');

function test(a) {
    alert(a);
}
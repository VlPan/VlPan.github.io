// При запуски программа создает обьект дня, что бы сравнить его с последним созданным днем.
// Если даты создания дней совподают, то очки за день записываются в последний день в массиве дней.
var day = new Day();
var days = []; // На случай если мы впервые зашли в прорамму
var passedTimeArr;
// Переменные, которым будут присвоины значения после того как пользователь укажит сложность и концентрацию
var difficulty;
var concentration;

// Взять все созданные ранее дела либо если их нет вернуть пустой массив
var actions = JSON.parse(localStorage.getItem("actions")) || [];

// Взять все созданные ранее задания либо если их нет вернуть пустой массив
var missions = JSON.parse(localStorage.getItem("missions")) || [];

// Время потраченное на выполнение задания. Рассчитывается таймером
var passedTime;

// Отбираем html элемент где будет размещен таймер и Создаем обьект таймер(watch). Исходники кода в файле stopwatch.js.
var timer = document.getElementById("timer");
var watch = new StopWatch(timer);

// Область где будут сохраняться все созданные пользователем задания
var actionsResult = document.getElementById('actions_ul');


// Область где будут сохраняться все созданные пользователем мисии
var missionsResult = document.getElementById('missions_ul');

// Область в которую выводится случайное задание
var action_text = document.getElementById("action");

// Область с указанием очков за день
var pointsForDay = document.getElementById("points_for_day");

// Элемент h4 c текстом "Укажите насколько сложно было выполнить данное дело"
var concentrationDescription = document.getElementById("concentration_description");
// Элемент h4 с текстом "Укажите насколько сложно вам было выполнить данное дело"
var difTitle = document.getElementById("diff");

//Кнопка для добавления новых заданий
var addNewAction = document.getElementById("add_new_action").addEventListener("click", saveActions);

//Кнопка для добавления новых миссий
var addNewMission = document.getElementById("add_new_mission").addEventListener("click", saveMissions);


// Кнопка для вывода случайного дела в облость action_text
var start = document.getElementById("start");
start.addEventListener("click", displayAction);

// Кнопка с возможность пропустить дело и перейти к другому случайному делу
var skip = document.getElementById("skip");
skip.addEventListener("click", skipAction);

// Кнопка подтвеждающая намерение пользователя приступить к делу
var accept = document.getElementById("accept");
accept.addEventListener("click", acceptAction);

// Кнопка ПАУЗА на таймере и ее функция
var toggleBtn = document.getElementById("toggle_btn");
toggleBtn.addEventListener('click', function () {
    (watch.isOn) ? stopTimer() : startTimer();
});

// Кнопка СБРОСИТ на таймере и ее функция
var resetBtn = document.getElementById("reset_btn");
resetBtn.addEventListener('click', function () {
    watch.reset();
});

// Кнопка завершить задание
var end = document.getElementById("end");
end.addEventListener("click", endAction);

// КНОПКИ ДЛЯ ВЫБОРА КОНЦЕНТРАЦИИ
var bad = document.getElementById("bad");
bad.addEventListener("click", badAction);

var normal = document.getElementById("normal");
normal.addEventListener("click", normalAction);

var good = document.getElementById("good");
good.addEventListener("click", goodAction);

var great = document.getElementById("great");
great.addEventListener("click", greatAction);


// КНОПКИ ДЛЯ ВЫБОРА СЛОЖНОСТИ
var easyDiff = document.getElementById("easy_diff");
easyDiff.addEventListener("click", easyDifficulties);

var normalDiff = document.getElementById("normal_diff");
normalDiff.addEventListener("click", normalDifficulties);

var hardDiff = document.getElementById("hard_diff");
hardDiff.addEventListener("click", hardDifficulties);

// Подсказка при нажатии на вопросик

var prompt = document.getElementsByClassName("fa-question-circle")[0].addEventListener("click", function () {
    alert("С помощью этого приложения вы можете отцифровать свою дейстельность! Вам нужно придумать дела, которые будут приближать" +
        " вас к выполнению вашей цели и задать им коэффициенты важности от 1 до 6 - Вы можете сделать это в разделе " +
        " Случайные дела. После того как вы закончите просто нажмите кнопку НАЧАТЬ для случаного выбора дйстельности. Вы также можете" +
        " Выбрать дело самостоятельно (Пока не реализовано)");
});

var actionsLi = document.getElementsByClassName("fa-caret-right"); // Выбераем маленькие синие стрелки


for (var i = 0; i < actionsLi.length; i++) { // Добавляем listener ко всем стрелкам
    console.log("sdsa");
    actionsLi[i].addEventListener('click', displayOne());
}

function displayOne(name) { // Производим дело из списка (не рандом)
    console.log(name);
    displayAction(name)
}



// Зона для вывода уведомлений
// var redAlertZone = document.getElementById("red_alert");


//Функция для сохранения заданий
function saveActions(e) {

    // Извлекаем Имя и коээфициент значимости задания
    var actionName = document.getElementById("action_input").value.toLowerCase();
    var actionRatio = document.getElementById("ratio_input").value.toLowerCase();
    actionRatio = parseInt(actionRatio); // Перевести в число


    // Валидация : оба поля должны быть заполнены и коэф : (1..6)
    if (!actionName || !actionRatio) {
        alert("Вы не ввели название дела или весовой коэффициент \n");
        return 0;
    }

    if (actionRatio <= 0 || actionRatio > 6) {
        alert("Коэфициет важности дела должен быть больше нуля и мменьше шести\n"
            + " 1 - Совершенно неважное дело 2 - Неважное дело 3 - среднее по важности дело 4 - Давольно важное дело 5 - Очень важное дело 6 - Критически важное дело");
        return 0;
    }

    var exit = false;
    actions.forEach(function (item) {
        if (item.name === actionName) {
            // actions = JSON.parse(localStorage.getItem("actions")) || [];
            alert("Вы уже добавили такое дело. Вы можете вызвать его напрямую из списка дел (Пока не реализовано)");
            exit = true; // Выйти из функции saveActions а не forEach
        }
    });
    if (exit) return 0;
    // Создаем новое задание
    var action = new Action(actionName, actionRatio);

    // Если в пямяти нету других заданий то создаем массив заданий, который будут зранить обьекты задания
    if (localStorage.getItem("actions") === null) {
        actions = [];
        actions.push(action);
        // Занести массив в локальную память
        localStorage.setItem('actions', JSON.stringify(actions));
    } else {
        // Если в памяти есть другие задания то берем массив и доьавляем новое задания, затем сохроням массив обратно
        actions = JSON.parse(localStorage.getItem("actions"));
        actions.push(action);
        localStorage.setItem('actions', JSON.stringify(actions));
    }

    document.getElementById('action_form').reset();
    e.preventDefault();

    // Удалить все задания из облости заданий - внесено в функцию fetchActions
    //actionsResult.innerHTML = '';

    // Сново вывести все заданий, включая только что добавленное
    fetchActions();


}

function saveMissions(e) {

    // Извлекаем Имя и коээфициент значимости задания
    var missionName = document.getElementById("mission_input").value.toLowerCase();
    var pointsForMission = document.getElementById("points_input").value.toLowerCase();
    pointsForMission = parseInt(pointsForMission); // Перевести в число


    // Валидация : оба поля должны быть заполнены и коэф : (1..6)
    if (!missionName || !pointsForMission) {
        alert("Вы не ввели название мисси или вколичетсво очков за нее \n");
        return 0;
    }


    var exit = false;
    missions.forEach(function (item) {
        if (item.name === missionName) {
            // missions = JSON.parse(localStorage.getItem("actions")) || [];
            alert("Вы уже добавили такую миссию");
            exit = true; // Выйти из функции saveActions а не forEach
        }
    });
    if (exit) return 0;
    // Создаем новое задание
    var mission = new Mission(missionName, pointsForMission);

    // Если в пямяти нету других заданий то создаем массив заданий, который будут зранить обьекты задания
    if (localStorage.getItem("missions") === null) {
        missions = [];
        missions.push(mission);
        // Занести массив в локальную память
        localStorage.setItem('missions', JSON.stringify(missions));
    } else {
        // Если в памяти есть другие задания то берем массив и доьавляем новое задания, затем сохроням массив обратно
        missions = JSON.parse(localStorage.getItem("missions"));
        missions.push(mission);
        localStorage.setItem('missions', JSON.stringify(missions));
    }

    document.getElementById('mission_form').reset();
    e.preventDefault();

    // Удалить все задания из облости заданий - внесено в функцию fetchActions
    //actionsResult.innerHTML = '';

    // Сново вывести все заданий, включая только что добавленное
    fetchMissions();
}


// Функция присваивает всем аргументам класс hide, который скрывает элемент display: none;
function hide() {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].classList.add("hide");
    }
}

// Удяляет класс hide
function unhide() {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].classList.remove("hide");
    }
}

function fetchInformation() {
    fetchActions();
    fetchMissions();
}

// Вывести все дела
function fetchActions() {
    actionsResult.innerHTML = '';
    console.log(missions);
    for (var i = 0; i < actions.length; i++) {
        var name = actions[i].name;
        var ratio = actions[i].importance;
        actionsResult.innerHTML += ' <li><span class = "actions_li">' + '<div class="action_name_li">' + name + '</div>' + '<i class="fa fa-caret-right" ' +
            'aria-hidden="true" onclick="displayOne(\'' + name + '\')"></i><span class="action_ratio">' + ratio + '</span>' + '<i class="fa fa-trash" ' +
            'onclick="deleteAction(\'' + name + '\')" aria-hidden="true"></i></span></li>';
    }

}

function deleteAction(name) { // Удаляет дело по его имени (тк одинаковых имен быть не может)
    actions.forEach(function (item, i) {
        if (item.name === name) {
            actions.splice(i, 1);
        }
    });
    localStorage.setItem("actions", JSON.stringify(actions));
    actionsResult.innerHTML = "";
    fetchActions();
}

function fetchMissions() {
    missionsResult.innerHTML = '';
    console.log(missions);
    for (var i = 0; i < missions.length; i++) {
        var name = missions[i].name;
        var pointsForMission = missions[i].points;
        missionsResult.innerHTML += ' <li><span class = "missions_li">' + '<div class="mission_name_li">' + name + '</div>' + '<i class="fa fa-check" ' +
            'aria-hidden="true" onclick="completeMission(\'' + name + '\')"></i><span class="mission_points">' + pointsForMission + '</span>' + '<i class="fa fa-trash" ' +
            'onclick="deleteMission(\'' + name + '\')" aria-hidden="true"></i></span></li>';
    }

}

function deleteMission(name) { // Удаляет дело по его имени (тк одинаковых имен быть не может)
    missions.forEach(function (item, i) {
        if (item.name === name) {
            missions.splice(i, 1);
        }
    });
    localStorage.setItem("missions", JSON.stringify(missions));
    missionsResult.innerHTML = "";
    fetchMissions();
}

function completeMission(name) {


    for (var i = 0; i < missions.length; i++) {
        if (missions[i].name === name) {
            var points = missions[i].points;
        }
    }
    day.missionHistory.push(name); // Добавить миссию в историю тек дня
    days = JSON.parse(localStorage.getItem("days"));
    console.log(days);
    console.log(day);
    localStorage.setItem("days", JSON.stringify(days));
    day.points += points; // Добавить очки
    days.pop();
    // Перед тем как занести новый день нужно убрать старый, так как они имеют одинаковую дату.
    // т.е что бы избежать дублирования одинаковых дней. 1 день - 1 обьект
    days.push(day);
    localStorage.setItem("days", JSON.stringify(days));
    // Обновляем количетсво очков видимое пользователю на странице
    updatePoints();
    deleteMission(name);
}


// Вывести имя лучайного задания
function displayAction(name) {

    console.log(name);
    if (!actions) {
        alert("Сначала нужно добавить хотя бы одно случайное дело!");
        return false;
    }

    var action_text = document.getElementById("action");

    if (typeof name === 'string' || name instanceof String) {
        action_text.textContent = name;
        console.log(name);
    }

    else {
        var randomNumber = getRandomNumber(0, actions.length - 1);
        console.log(randomNumber);
        var randomElName = actions[randomNumber].name;
        action_text.textContent = randomElName;
    }
    unhide(skip, accept);
    hide(start);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Для кнопки пропустить дело
function skipAction() {
    var randomNumber = getRandomNumber(0, actions.length - 1);
    var randomElName = actions[randomNumber].name;
    action_text.textContent = randomElName;

}

function acceptAction() {
    unhide(end, timer, toggleBtn, resetBtn);
    hide(skip, accept);
    watch.start();
}

function stopTimer() {
    watch.stop();
    toggleBtn.textContent = "Запустить";
}

function startTimer() {
    watch.start();
    toggleBtn.textContent = "Пауза";
}

// Завершить Дело
function endAction() {

    // passedTime = parseInt(timer.innerHTML);
    //взять первые 2 числа со строки до 99 минт

    passedTime = timer.innerHTML;
    passedTimeArr = passedTime.split(".");
    console.log(passedTimeArr);
    watch.reset();
    watch.stop();

    for (var i = 0; i < actions.length; i++) {
        if (actions[i].name === action_text.textContent) {
            actions[i].minutes += passedTime;  // Добавить время в текущее дело (Для истории в будующем)
            console.log(actions[i].name);
            console.log(day);


            day.history.push(actions[i].name); // Добавить дело в историю тек дня
            days = JSON.parse(localStorage.getItem("days"));
            console.log(days);
            days.pop();
            days.push(day);
            console.log(day);
            localStorage.setItem("days", JSON.stringify(days));
        }
    }


    localStorage.setItem("actions", JSON.stringify(actions));
    hide(end, timer, toggleBtn, resetBtn);
    unhide(bad, normal, good, great, concentrationDescription);


}

// Установка концентрации
function badAction() {
    concentration = 0.5;
    hide(bad, normal, good, great);
    unhide(easyDiff, normalDiff, hardDiff, difTitle);
}

function goodAction() {
    concentration = 1.5;
    hide(bad, normal, good, great);
    unhide(easyDiff, normalDiff, hardDiff, difTitle);
}

function normalAction() {
    concentration = 1;
    hide(bad, normal, good, great);
    unhide(easyDiff, normalDiff, hardDiff, difTitle);
}


function greatAction() {
    concentration = 2;
    hide(bad, normal, good, great, concentrationDescription);
    unhide(easyDiff, normalDiff, hardDiff, difTitle);
}



function calculatePoints(){
     if(parseInt(passedTimeArr[0]) !== 0){
        day.points += difficulty * concentration *  (( parseInt(passedTimeArr[0]) * 60)
            +  parseInt(passedTimeArr[1])) * (getRatioOfCurrentAction() / 2); // Расчет по формуле
    }else{
        day.points += difficulty * concentration
            *  parseInt(passedTimeArr[1]) * (getRatioOfCurrentAction() / 2); // Расчет по формуле
    }


    days.pop();
    // Перед тем как занести новый день нужно убрать старый, так как они имеют одинаковую дату.
    // т.е что бы избежать дублирования одинаковых дней. 1 день - 1 обьект
    days.push(day);
    localStorage.setItem("days", JSON.stringify(days));

    hide(bad, normal, good, great, concentrationDescription, easyDiff, normalDiff, hardDiff, difTitle);
    unhide(start);
    // Обновляем количетсво очков видимо пользователю на странице
    updatePoints();
}

// Финальная кнопка - установка сложности
function easyDifficulties() {
    difficulty = 0.5;
    calculatePoints();
}

function normalDifficulties() {
    difficulty = 1;
    calculatePoints();
}

function hardDifficulties() {
    difficulty = 1.7;
    calculatePoints();
}


// Узнать коэффициет важности данного дела
function getRatioOfCurrentAction() {
    for (var i = 0; i < actions.length; i++) {
        if (actions[i].name = action_text.textContent) {
            return actions[i].importance;
        }
    }

}

// Обновить количество очков видимое пользователю
function updatePoints() {
    pointsForDay.textContent = Math.round(day.points);
}


// САМОВЫЗЫВАЮШЕЕСЯ фун для сравнения прошлого дня с текущем. Если это одинаковые дни то пополнять
// массив days и обнулять кво очков не нужно.
(function findDay() {
    if (localStorage.getItem("days") !== null) {
        // Если мы НЕ впервые вошли в программу. ТО нужно сравнить даты последнего дня в массиве и текущем днем
        days = JSON.parse(localStorage.getItem("days"));
        if (days[days.length - 1].date[2] === day.date[2] &&
            days[days.length - 1].date[1] === day.date[1] &&
            days[days.length - 1].date[0] === day.date[0]) {
            day = days[days.length - 1];
            console.log("Это тот же день!");
        }
        else {
            // Если даты не равны вплоть до дня (год месяц день) то это новый день
            console.log("Это новый день!");
            days.push(day);
            localStorage.setItem("days", JSON.stringify(days));
        }
    } else {
        // Если мы впревые в проге то просто добавляем этот день
        days.push(day);
        localStorage.setItem("days", JSON.stringify(days));
    }

    updatePoints();  // Если мы снова открыли прогу то функция покажет количетсво очков уже заработанных за день
})();


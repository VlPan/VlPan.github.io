var prefix = prompt('Укажите свой префикс');
var elementSeporator = prompt('Укажите разделительный знак для элементов');
var modSeporator = prompt('Укажите разделительный знак для модификаторов');

var all = document.getElementsByTagName("*");

for (var i = 0, max = all.length; i < max; i++) {

    var currentClasses = all[i].classList;
    for (var j = 0; j < currentClasses.length; j++) {
        if (currentClasses[j].indexOf(elementSeporator) === -1
            && currentClasses[j].indexOf(prefix) === 0
            && currentClasses[j].indexOf(modSeporator) === -1
            && currentClasses[j].indexOf("container") === -1) {

            var els = document.getElementsByClassName(currentClasses[j]);

            for (var j2 = 0; j2 < els.length; j2++) {
                els[j2].style.border = "1px dashed darkred";
            }

        }
    }
}
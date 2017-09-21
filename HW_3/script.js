
setTimeout(function () {
    document.querySelector('body').classList.add('loaded');

    var plus = document.getElementById('plus');
    var minus = document.getElementById('minus');
    var divContainer = document.getElementById('div-container');


// now you have a proper float for the font size (yes, it can be a float, not just an integer)


    plus.addEventListener('click',function () {

        divContainer.style.fontSize = (getSize(divContainer) + 3) + 'px';
    });

    minus.addEventListener('click',function () {
        style = window.getComputedStyle(divContainer, null).getPropertyValue('font-size');
        fontSize = parseFloat(style);
        divContainer.style.fontSize = (getSize(divContainer) - 3) + 'px';
    });
},500);

function getSize(el) {
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);
    return fontSize;
}


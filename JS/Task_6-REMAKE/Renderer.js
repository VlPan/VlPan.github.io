function Renderer() {

}

Renderer.prototype._createOneElement = function (settings) {
    var el = document.createElement(settings.tag);
    this._addClasses(el, settings.classes);
    if (settings.textContent) {
        el.textContent = settings.textContent;
    }

    if(settings.eventHandlers){
        el.setAttribute('onclick', settings.eventHandlers['onclick']);
    }

    if (settings.childrens) {
        for (var elem = 0; elem < settings.childrens.length; elem++) {
            el.appendChild(this._createOneElement(settings.childrens[elem]));
        }
    }

    return el;
};

Renderer.prototype._addClasses = function (el, classes) {
    if (!Array.isArray(classes)) {
        el.classList.add(classes);
    }
    else {
        for (var i = 0; i < classes.length; i++) {
            el.classList.add(classes[i]);
        }
    }
}

Renderer.prototype.create = function (settings) {

    var fragment = document.createDocumentFragment();
    fragment.appendChild(this._createOneElement(settings));
    return fragment;
};



Renderer.prototype.render = function (elToAppend, selector) {
    return document.querySelector(selector).appendChild(elToAppend);
};


Renderer.prototype.createElementsWithDifferentContext = function (settings, arrOfContext, objProperty, styleCondition) {

    var arr = [];

    arrOfContext.forEach(function (item, index) {

        var el = {};
        el.tag = settings.tag;
        el.classes = [];
        el.classes.push(settings.classes);



        if(typeof item === 'object'){
            if(typeof item[objProperty] === 'function'){
                el.textContent = item[objProperty]()
            }else{
                el.textContent = item[objProperty]
            }
        }else{
            el.textContent = item;
        }

        if(styleCondition){
            for(var i = 0; i < styleCondition.length; i++){
                if (eval(styleCondition[i].condition) === true) {

                    el.classes.push(styleCondition[i].styleClass)

                }
            }
        }

        if(settings.childrens){
            el.childrens = settings.childrens;
        }

        arr.push(el);

    });

    return arr;
};


Renderer.prototype.addClassesByCondition = function (arrOfClassConditionObjects, defaultClasses) {
    arrOfClassConditionObjects.forEach(function (obj) {
        if(obj.condition === true){
            defaultClasses.push(obj.styleClass);
        }

    });

    return defaultClasses;
}



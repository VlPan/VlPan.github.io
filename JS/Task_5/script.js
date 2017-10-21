$(document).ready(function () {

    if (window.performance) {
        console.info("window.performance work's fine on this browser");
    }
    if (performance.navigation.type == 1) {
        console.info( "This page is reloaded" );
        localStorage.removeItem('formObject');
    } else {
        console.info( "This page is not reloaded");
    }

    $(document).keydown(function (e) {
        if (e.key=="F5") {
            localStorage.removeItem('formObject');
            console.log('REMOVED');
        }
        else if (e.key.toUpperCase() == "R" && prevKey == "CONTROL") {
            localStorage.removeItem('formObject');
        }
        prevKey = e.key.toUpperCase();
    });

    var FormHandlerObject = function (Inputs) {
        this.fromDate = Inputs.fromDate || 'дд.мм.гггг';
        this.fromTime = Inputs.fromTime || '--:--';

        this.toDate = Inputs.toDate || 'дд.мм.гггг';
        this.toTime = Inputs.toTime || '--:--';

        this.radioOption = Inputs.radioOption || ' ';
        this.selectOneOption = Inputs.selectOneOption || ' ';
        this.selectTwoOption = Inputs.selectTwoOption ||  ' ';
    };

    var Inputs = getObjectFromLocalStorage('formObject') || {};
    console.log(Inputs);
    var formHandler = new FormHandlerObject(Inputs);

    var fromDate = document.getElementById('from_date');
    var fromTime = document.getElementById('from_time');
    var toDate = document.getElementById('to_date');
    var toTime = document.getElementById('to_time');
    var radioOptions = document.getElementsByClassName('hw-radio-options__option');
    var selectOptions = document.getElementsByClassName('hw-select');

    fillInputsAndOptions(formHandler);
    localStorage.setItem('test', 'test');

    $(fromDate).focusout(function ($e) {
        formHandler.fromDate = $e.target.value;
        setObjectToLocalStorage('formObject', formHandler);
    });

    $(fromTime).focusout(function ($e) {
        formHandler.fromTime = $e.target.value;
        setObjectToLocalStorage('formObject', formHandler);
    });

    $(toDate).focusout(function ($e) {
        formHandler.toDate = $e.target.value;
        setObjectToLocalStorage('formObject', formHandler);
    });

    $(toTime).focusout(function ($e) {
        formHandler.toTime = $e.target.value;
        setObjectToLocalStorage('formObject', formHandler);
    });


    $(selectOptions[0]).change(function ($e) {
        formHandler.selectOneOption = $e.target.value;
        setObjectToLocalStorage('formObject', formHandler);
    });

    $(selectOptions[1]).change(function ($e) {
        formHandler.selectTwoOption = $e.target.value;
        setObjectToLocalStorage('formObject', formHandler);
    });


    $(radioOptions).change(function ($e) {
        formHandler.radioOption = $e.target.value;
        setObjectToLocalStorage('formObject', formHandler);
    });

    function setObjectToLocalStorage(nameInLocalStorage, obj) {
        localStorage.setItem(nameInLocalStorage, JSON.stringify(obj));
    }

    function getObjectFromLocalStorage(name) {
        console.log(JSON.parse(localStorage.getItem(name)));
        return JSON.parse(localStorage.getItem(name));
    }

    function fillInputsAndOptions(formHandler) {
        fromDate.value = changeFormat(formHandler.fromDate);
        fromTime.value = formHandler.fromTime;
        toDate.value = changeFormat(formHandler.toDate);
        toTime.value = formHandler.toTime;

        for (var i = 0; i < radioOptions.length; i++) {
            if (radioOptions[i].value === formHandler.radioOption) {
                radioOptions[i].checked = true;
            }
        }

        for (var i = 0; i < selectOptions.length; i++) {
            for (var y = 0; y < selectOptions[i].length; y++) {


                if (selectOptions[0][y].value === formHandler.selectOneOption) {
                    selectOptions[0][y].selected = true;
                }

                if (selectOptions[1][y].value === formHandler.selectTwoOption) {
                    selectOptions[1][y].selected = true;
                }
            }
        }

    }

    function changeFormat(string) {
        var arr = string.split('.');


        i = arr[arr.length - 1];
        arr[arr.length - 1] = arr[0];
        arr[0] = i;

        return arr.join('-');
    }

});







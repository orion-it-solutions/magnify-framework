$(document).ready(function() {

    Initialize();

    function Initialize() {
        setColor();
        setBackgroundColor();
    }

    function setColor() {
        $("*").each(function(index, element) {
            const background = $(element).attr("color");
            if(!background)
                return;
            $(element).css("color", background);
        });
    }

    function setBackgroundColor() {
        $("*").each(function(index, element) {
            const background = $(element).attr("background-color");
            if(!background)
                return;
            $(element).css("background-color", background);
        });
    }

});
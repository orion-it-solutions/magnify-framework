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

    $('.dropdown-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropdownToggleId = $(this).attr("id");
        const dropdownMenu = $(".dropdown-menu[for-element=" + dropdownToggleId + "]");
        if($(dropdownMenu).hasClass("show")) {
            $(dropdownMenu).removeClass("show"); return;
        }
        $(dropdownMenu).addClass("show");
    });

    $('body:not(.dropdown-toggle)').click(function(e){
        $(".dropdown-toggle").each(function (index, item) {
            $(item).children(".dropdown-menu").removeClass("show");
        });
        console.log("Hello");
    });
});
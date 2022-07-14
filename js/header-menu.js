$(document).ready(function() {

    Initialize();

    function Initialize() {
        ConfigureResizeHeaders();
        window.onresize = OnResizeHeaderMenu;
        OnResizeHeaderMenu();
    }

    function ConfigureResizeHeaders() {
        $(".header-menu-container").children(".header-menu").each(function (parentIndex, parentItem) {
            let totalChildrensWidth = 0;
            $(parentItem).children(".header-collapse").children("div").each(function (childrenIndex, childrenItem) {
                totalChildrensWidth += $(childrenItem).width();
            });
            HEADER_MENUS.push({
                id: parentIndex,
                totalChildrensWidth: totalChildrensWidth
            });
        });
    }

    function OnResizeHeaderMenu() {
        $(".header-menu-container").children(".header-menu").each(function (parentIndex, parentItem) {
            console.log(HEADER_MENUS[parentIndex].totalChildrensWidth, parentItem.offsetWidth);
            if(HEADER_MENUS[parentIndex].totalChildrensWidth >= parentItem.offsetWidth) {
                console.log("Collapsed")
                $(parentItem).children(".header-collapse").addClass("collapsed");
                $(parentItem).parent(".header-menu-container").children(".header-collapse-toggler").addClass("show");
            } else {
                console.log("No Collapsed")
                $(parentItem).children(".header-collapse").removeClass("collapsed");
                $(parentItem).parent(".header-menu-container").children(".header-collapse-toggler").removeClass("show");
            }
        });
    }

    $(".header-collapse-toggler").click(function() {
        const displayed = $(this).attr("displayed");
        const menu = $(this).attr("to");
        if(displayed === "true") {
            $("#" + menu).removeClass("active");
            $(this).attr("displayed", false);
            return;
        }
        $("#" + menu).addClass("active");
        $(this).attr("displayed", true);
    });
});
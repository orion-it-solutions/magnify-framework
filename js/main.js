var COLLAPSED_NAVBAR = false;
var HEADER_MENUS = [];

$(document).ready(function() {

    Initialize();

    /**
     * Function to initialize all the components and functions used in Magnify framework.
     */
    function Initialize() {
        SetCustomProperties();
        InitializeCollapseNavbar();
        ConfigureResizeHeaders();
        window.onresize = OnResizeHeaderMenu;
        OnResizeHeaderMenu();
    }

    /**
     * Function to set the custom properties provided by attributes of the elements.
     */
    function SetCustomProperties() {
        $("*").each(function(index, element) {
            const color = $(element).attr("mf-color");
            const background = $(element).attr("mf-background-color");
            if(color)
                $(element).css("color", color);
            if(background)
                $(element).css("background-color", background);
        });
    }

    /**
     * Function to configure the resize that the header needs to have.
     * Set the total children width and identify each header menu.
     */
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

    /**
     * Function to resize header when the screen is changinf the size.
     */
    function OnResizeHeaderMenu() {
        $(".header-menu-container").children(".header-menu").each(function (parentIndex, parentItem) {
            if(HEADER_MENUS[parentIndex].totalChildrensWidth >= parentItem.offsetWidth) {
                $(parentItem).children(".header-collapse").addClass("collapsed");
                $(parentItem).parent(".header-menu-container").children(".header-collapse-toggler").addClass("show");
            } else {
                $(parentItem).children(".header-collapse").removeClass("collapsed");
                $(parentItem).parent(".header-menu-container").children(".header-collapse-toggler").removeClass("show");
            }
        });
    }

    /**
     * Function to initialize the collapse navbar elements.
     */
    function InitializeCollapseNavbar() {
        $("*[action='collapse-navbar']").each(function (index, element) {
            const collapse = window.localStorage.getItem('COLLAPSED_NAVBAR');
            if (collapse == "true")
                COLLAPSED_NAVBAR = false;
            else
                COLLAPSED_NAVBAR = true;
            CollapseNavbar(element);
        });
    }

    /**
     * Function to collapse navbar from an element.
     * @param {object} e 
     */
    function CollapseNavbar(e) {
        if (COLLAPSED_NAVBAR) {
            $(`#${$(e).attr("to")}`).removeClass("collapsed");
            COLLAPSED_NAVBAR = false;
        } else {
            $(`#${$(e).attr("to")}`).addClass("collapsed");
            COLLAPSED_NAVBAR = true;
        }
        window.localStorage.setItem("COLLAPSED_NAVBAR", COLLAPSED_NAVBAR);
    }

    /**
     * Function to redirect to another page from an element.
     * @param {object} e 
     */
    function RedirectNavbar(e) {
        $(".navbar-item").parent(".navbar-item-container").removeClass("active");
        $(e).parent(".navbar-item-container").addClass("active");
        window.location.href = $(e).children(".navbar-item-link").attr("href");
    }

    /**
     * Function to be excecuted on click of a navbar item element.
     */
    $(".navbar-item").click(function () {
        const action = $(this).attr("action");
        if (action === "collapse-navbar") {
            CollapseNavbar(this);
        }
        if (action === "hyperlink-navbar") {
            RedirectNavbar(this);
        }
    });

    /**
     * Function to be executed when a click is detected on toggler in the header when is collapsed.
     */
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

    /**
     * Function to be executed when a click is detected on dropdown element.
     */
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

    /**
     * Function to be excecuted when a click is detected on body, excluding all custom elements.
     */
    $('body:not(.dropdown-toggle)').click(function(e) {
        $(".dropdown-toggle").each(function (index, item) {
            $(item).children(".dropdown-menu").removeClass("show");
        });
    });
});
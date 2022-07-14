$(document).ready(function () {

    Initialize();

    function Initialize() {
        InitializeCollapseNavbar();
    }

    function InitializeCollapseNavbar() {
        $("*").each(function (index, element) {
            const action = $(element).attr("action");
            if (action === "collapse-navbar") {
                $(element).click(() => CollapseNavbar(this));
                const collapse = window.localStorage.getItem('COLLAPSED_NAVBAR');
                if (collapse == "true")
                    COLLAPSED_NAVBAR = false;
                else
                    COLLAPSED_NAVBAR = true;
                $(element).trigger("click");
            }
            if (action === "hyperlink-navbar") {
                $(element).click(() => RedirectNavbar(this));
            }
        });
    }

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

    function RedirectNavbar(e) {
        $(".navbar-item").parent(".navbar-item-container").removeClass("active");
        $(e).parent(".navbar-item-container").addClass("active");
        window.location.href = $(e).children(".navbar-item-link").attr("href");
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const fullscreenIcon = document.getElementById("fullscreen-toggle");
    const themesIcon = document.getElementById("themes"); 

    // Function to toggle the fullscreen
    fullscreenIcon.addEventListener("click", function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreenIcon.classList.remove("fa-expand");
            fullscreenIcon.classList.add("fa-compress");
            fullscreenIcon.title = "Exit Full Screen";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenIcon.classList.remove("fa-compress");
                fullscreenIcon.classList.add("fa-expand");
                fullscreenIcon.title = "Fullscreen";
            }
        }
    });
    document.addEventListener("fullscreenchange", function() {
        if (!document.fullscreenElement) {
            fullscreenIcon.classList.remove("fa-compress");
            fullscreenIcon.classList.add("fa-expand");
            fullscreenIcon.title = "Fullscreen";
        }
    });

    // Function to toggle the theme
    function toggleTheme() {
        if (document.body.classList.contains("light-theme")) {
            document.body.classList.remove("light-theme");
            themesIcon.title = "Light Theme";
            localStorage.setItem("theme", "dark"); // Save theme to localStorage
        } else {
            document.body.classList.add("light-theme");
            themesIcon.title = "Dark Theme";
            localStorage.setItem("theme", "light"); // Save theme to localStorage
        }
    }

    // Apply the theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themesIcon.title = "Dark Theme";
    } else {
        themesIcon.title = "Light Theme";
    }

    themesIcon.addEventListener("click", toggleTheme);
});

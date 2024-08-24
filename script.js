document.addEventListener("DOMContentLoaded", function() {
    const fullscreenIcon = document.getElementById("fullscreen-toggle");
    const themesIcon = document.getElementById("themes"); 
    const time = document.getElementById("display");
    let [milliseconds, seconds, minutes, hours] = [0,0,0,0];
    let int = null;

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
    themesIcon.addEventListener("click", function(){
        if (document.body.classList.contains("light-theme")) {
            document.body.classList.remove("light-theme");
            themesIcon.title = "Light Theme";
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add("light-theme");
            themesIcon.title = "Dark Theme";
            localStorage.setItem("theme", "light");
        }
    });

    // Apply the theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themesIcon.title = "Dark Theme";
    } else {
        themesIcon.title = "Light Theme";
    }

    document.getElementById("start").addEventListener("click", function(){
        if(int !=null){
            clearInterval(int);
        }
        int = setInterval(displayTimer, 10);
    });

    document.getElementById("pause").addEventListener("click", function(){
        clearInterval(int);
    });

    document.getElementById("reset").addEventListener("click", function(){
        clearInterval(int);
        [milliseconds, seconds, minutes, hours] = [0,0,0,0];
        time.innerHTML = "00 : 00 : 00 : 000";
    });

    function displayTimer(){
        milliseconds += 10;
        if(milliseconds == 1000){
            milliseconds = 0;
            seconds++;
            if(seconds == 60){
                seconds = 0;
                minutes++;
                if(minutes == 60){
                    minutes = 0;
                    hours++;
                }
            }
        }
        
        let h = hours.toString().padStart(2, '0');
        let m = minutes.toString().padStart(2, '0');
        let s = seconds.toString().padStart(2, '0');
        let ms = milliseconds.toString().padStart(3, '0');

        time.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
    }
});

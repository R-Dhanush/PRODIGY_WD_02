document.addEventListener("DOMContentLoaded", function() {
    const fullscreenIcon = document.getElementById("fullscreen-toggle");
    const themesIcon = document.getElementById("themes");
    const navbar = document.getElementById("navbar");
    const aside = document.getElementById("lap-times");
    const footer = document.getElementById("footer");
    const time = document.getElementById("display");
    const lapsTableBody = document.querySelector("#laps tbody");
    let [milliseconds, seconds, minutes, hours] = [0,0,0,0];
    let int = null;
    let lastLapTime = 0;
    let lapCounter = 0;

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
            navbar.style.backgroundColor = "#000";
            navbar.style.color = "#fff";
            aside.style.backgroundColor = "#00000080";
            aside.style.color = "#fff";
            footer.style.backgroundColor = "#000";
            footer.style.color = "#fff";
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add("light-theme");
            themesIcon.title = "Dark Theme";
            navbar.style.backgroundColor = "#6CCFF6";
            navbar.style.color = "#000";
            aside.style.backgroundColor = "#6acef680"
            aside.style.color = "#000";
            footer.style.backgroundColor = "#6CCFF6";
            footer.style.color = "#000";
            localStorage.setItem("theme", "light");
        }
    });

    // Apply the theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        navbar.style.backgroundColor = "#6CCFF6";
        navbar.style.color = "#000";
        aside.style.backgroundColor = "#6acef680"
        aside.style.color = "#000"
        footer.style.backgroundColor = "#6CCFF6";
        footer.style.color = "#000";
        themesIcon.title = "Dark Theme";
    } else {
        themesIcon.title = "Light Theme";
        navbar.style.backgroundColor = "#000";
        navbar.style.color = "#fff";
        aside.style.backgroundColor = "#00000080";
        aside.style.color = "#fff";
        footer.style.backgroundColor = "#000";
        footer.style.color = "#fff";
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
        lastLapTime = 0;
        lapCounter = 0; // Reset lap counter
        time.innerHTML = "00 : 00 : 00 : 000";
        lapsContainer.innerHTML = "";
    });

    document.getElementById("lap").addEventListener("click", function() {
        recordLap();
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

    function recordLap() {
        const totalMilliseconds = ((hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + milliseconds);
        const lapMilliseconds = totalMilliseconds - lastLapTime;
        lastLapTime = totalMilliseconds;

        const lapTime = formatTime(lapMilliseconds);
        const totalTime = formatTime(totalMilliseconds);

        const lapRow = document.createElement("tr");
        lapRow.innerHTML = `
            <td>${lapCounter + 1}</td>
            <td>${lapTime}</td>
            <td>${totalTime}</td>
        `;
        lapsTableBody.appendChild(lapRow);

        lapCounter++;
    }

    function formatTime(ms) {
        let hours = Math.floor(ms / (60 * 60 * 1000));
        ms = ms % (60 * 60 * 1000);
        let minutes = Math.floor(ms / (60 * 1000));
        ms = ms % (60 * 1000);
        let seconds = Math.floor(ms / 1000);
        ms = ms % 1000;

        let h = hours.toString().padStart(2, '0');
        let m = minutes.toString().padStart(2, '0');
        let s = seconds.toString().padStart(2, '0');
        let milliseconds = ms.toString().padStart(3, '0');

        return `${h} : ${m} : ${s} : ${milliseconds}`;
    }
});

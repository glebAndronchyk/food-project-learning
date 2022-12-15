function timer() {
    const deadLine = "2022-12-30";
    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const timerDays = timer.querySelector('#days');
        const timerHours = timer.querySelector('#hours');
        const timerMinutes = timer.querySelector('#minutes');
        const timerSeconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            timerDays.textContent = t.days < 10 ? `0${t.days}` : t.days;
            timerHours.textContent = t.hours < 10 ? `0${t.hours}` : t.hours;
            timerMinutes.textContent = t.minutes;
            timerSeconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);
}

module.exports = timer;

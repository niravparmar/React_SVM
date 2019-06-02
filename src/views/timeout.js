function timeOutCheck() {
    let lastServerAccessTime;
    let scheduledTimer;
    let timeOutIntervalInMillis = 0;
    let timedOutCallback;
    function stopTimer() {
        if (scheduledTimer) {
            clearInterval(scheduledTimer);
            scheduledTimer = undefined;
        }
    }

    function serverAccessed() {
        lastServerAccessTime = new Date();
    }

    const startFreshTimer = function (timeOutInMillis,timedOutCBFunction) {
        timeOutIntervalInMillis = timeOutInMillis;
        timedOutCallback =  timedOutCBFunction;
        stopTimer();
        let schedulingInterval = timeOutIntervalInMillis/20;
        lastServerAccessTime = new Date();
        scheduledTimer = setInterval(() => {
            checkTimeLeft();
        }, schedulingInterval);


        function checkTimeLeft() {
            let currentTime = new Date();
            let timeDiff = currentTime.getTime() - lastServerAccessTime.getTime();
            if ( timeDiff > timeOutIntervalInMillis) {
                if (scheduledTimer) {
                    clearInterval(scheduledTimer);
                }
                timedOutCallback();
            }

        }

    }

    startFreshTimer.stopTimer = stopTimer;
    startFreshTimer.setServerAccessed = serverAccessed;

    return startFreshTimer;

}

export default timeOutCheck;
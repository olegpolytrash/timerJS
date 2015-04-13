/**
 * Created by Oleg on 10.04.2015.
 */
(function (timerNameSpace, $, undefined) {

    timerNameSpace.Timer = function (goal, timerName, timePassed, timerID) {
        this.goal = goal;
        this.timePassed = timePassed || 0;
        this.timerName = timerName;
        this.timerID = timerID;

        if (!timerName !== undefined) {
            this.getTimeFromLocalStorage();
        }
    };

    timerNameSpace.Timer.prototype.start = function (displayFunction) {
        var that = this;
        this.timerID = setInterval(function () {
            displayFunction(that.addTime(1));
            console.log("iter");
        }, 1000);
    };

    timerNameSpace.Timer.prototype.stop = function (timeToAdd) {
        clearInterval(this.timerID);
        this.timerID = -1;
        this.saveTimeInLocalStorage();
    };

    timerNameSpace.Timer.prototype.addTime = function (timeToAdd) {
        this.timePassed += timeToAdd;
        return this.timePassed;
    };

    timerNameSpace.Timer.prototype.getTime = function () {
        return this.timePassed;
    };

    timerNameSpace.Timer.prototype.setTime = function (time) {
        this.timePassed = time;
    };

    timerNameSpace.Timer.prototype.getTimeFromLocalStorage = function () {
        this.timePassed = Number(localStorage.getItem(this.timerName));
    };

    timerNameSpace.Timer.prototype.saveTimeInLocalStorage = function () {
        localStorage.setItem(this.timerName, this.timePassed);
    };

}(window.timerNameSpace = window.timerNameSpace || {}, jQuery));
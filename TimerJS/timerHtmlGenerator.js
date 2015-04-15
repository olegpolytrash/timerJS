/**
 * Created by Oleg on 13.04.2015.
 */

function generate() {

}

$(function () {
    var count = 1;

    function getNewTimerName() {
        var timerName = $("#newTimerName").val();

        if (timerName === "") {
            throw "incorrect name";
        }

        return timerName;
    }

    function getNewTimerGoal() {
        var timerGoalMM = Number( $("#newGoalMM").val() );
        var timerGoalHH = Number($("#newGoalHH").val());
        var timerGoalSS = Number($("#newGoalSS").val());
        var timerGoal = {hh: timerGoalHH, mm: timerGoalMM, ss: timerGoalSS};

        if (timerGoalHH === 0 && timerGoalMM === 0 && timerGoalSS == 0) {
            throw "incorrect goal";
        }

        return timerGoal;
    }

    function getNewRow(newRowID, newTimerGoal, newTimerName) {
        var clonedDiv = $('#timerRow').clone();
        clonedDiv.attr("id", newRowID);
        clonedDiv.find("#goal").text(newTimerGoal.hh + ":" + newTimerGoal.mm + ":" + newTimerGoal.ss);
        clonedDiv.find("#timerName").text(newTimerName);

        return clonedDiv;
    }

    $("#addTimer").bind("click", function () {
        // Get the new row's data
        var newTimerName = getNewTimerName();
        var newTimerGoal = getNewTimerGoal();
        var timer = new timerNameSpace.Timer(newTimerGoal, newTimerName);
        var newRowId = "row" + count;

        // clone and insert the new row
        var newRow = getNewRow(newRowId, newTimerGoal, newTimerName);
        $('.addRow').after(newRow);

        // update timer
        $("#" + newRowId + " #timerText").text(timer.getTime());

        // set the new row's button events
        $("#" + newRowId + " #startTimer").bind("click", function () {
            timer.start(function (val) {
                $("#" + newRowId + " #timerText").text(val);
            });
        });

        $("#" + newRowId + " #stopTimer").bind("click", function () {
            timer.stop();
        });


        count++;
    });
});
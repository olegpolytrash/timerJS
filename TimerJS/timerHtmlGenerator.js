/**
 * Created by Oleg on 13.04.2015.
 */

function generate() {

}

$(function () {
    var count = 1;

    $("#addTimer").bind("click", function () {
        var timerName = $("#newTimerName").val();
        var timerGoalMM = Number( $("#newGoalMM").val() );
        var timerGoalHH = Number($("#newGoalHH").val());
        var timerGoalSS = Number($("#newGoalSS").val());
        var timerGoal = {hh: timerGoalHH, mm: timerGoalMM, ss: timerGoalSS};

        if (timerGoalHH === 0 && timerGoalMM === 0 && timerGoalSS == 0) {
            throw "incorrect goal";
        }

        if (timerName === "") {
            throw "incorrect name";
        }

        var timer = new timerNameSpace.Timer(timerGoal, timerName);

        var clonedDiv = $('#timerRow').clone();
        clonedDiv.attr("id", "row" + count);
        clonedDiv.find("#goal").text(timerGoal.hh + ":" + timerGoal.mm + ":" + timerGoal.ss);
        clonedDiv.find("#timerName").text(timerName);
        $('.addRow').after(clonedDiv);

        $("#row" + count + " #startTimer").bind("click", function () {
            timer.start(function (val) {
                $("#row1 #timerText").text(val);
            });
        });

        $("#row" + count + " #stopTimer").bind("click", function () {
            timer.stop();
        });


        count++;
    });
});
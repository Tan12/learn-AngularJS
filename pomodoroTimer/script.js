/**
 * Created by Administrator on 2016/12/6 0006.
 */
var app = angular.module('timerApp', []);
app.controller('timerCtrl', function ($scope, $interval) {
    $scope.breakLength = 5;
    $scope.sessionLength = 10;
    $scope.sessionName = 'session';
    $scope.timeLeft = $scope.sessionLength;

    $scope.originTime = $scope.sessionLength;
    $scope.fillHeight = '0%';

    var runTimer = false, // 标记计时器有没有在运行，默认没有
        seconds = 60 * $scope.timeLeft;

    $scope.breakLengthChange = function (num) {
        if(!runTimer){
            if($scope.sessionName === 'break'){
                $scope.breakLength += num;
                if($scope.breakLength <= 0){
                    $scope.breakLength = 1;
                }
                $scope.timeLeft = $scope.breakLength;
                seconds = 60 * $scope.breakLength;
                $scope.originTime = $scope.breakLength;
            }
        }
    };

    $scope.sessionLengthChange = function (num) {
        if(!runTimer){
            if($scope.sessionName === 'session'){
                $scope.sessionLength += num;
                if($scope.sessionLength <= 0){
                    $scope.sessionLength = 1;
                }
                $scope.timeLeft = $scope.sessionLength;
                seconds = 60 * $scope.sessionLength;
                $scope.originTime = $scope.sessionLength;
            }
        }
    };

    $scope.toggleTimer = function () {
        if(!runTimer){
            updateTimer();
            runTimer = $interval(updateTimer, 1000);
        }else {
            $interval.cancel(runTimer);
            runTimer = false;
        }
    };

    //更新时间
    function updateTimer() {
        seconds -= 1;
        if(seconds < 0){
            $scope.fillColor = '#333';
            if($scope.sessionName === 'session'){
                $scope.sessionName = 'break';
                $scope.timeLeft = $scope.breakLength;
            }else {
                $scope.sessionName = 'session';
                $scope.timeLeft = $scope.sessionLength;
            }
            seconds = 60 * $scope.timeLeft;
            $scope.originTime = $scope.timeLeft;
        }else {
            if($scope.sessionName === 'break'){
                $scope.fillColor = '#ff4444';
            }else {
                $scope.fillColor = '#99cc00';
            }
        }
        $scope.timeLeft = secondsToHms(seconds);

        var ori = $scope.originTime * 60,
            per = (1 - seconds/ori) * 100;
        $scope.fillHeight = per + '%';
    }

    //将秒数转换为时分秒
    function secondsToHms(time) {
        var h = Math.floor(time/3600),
            m = Math.floor(time%3600/60),
            s = Math.floor(time%3600%60);
        // 将格式转为00:00:00
        return  (
            (h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s
        );
    }
});
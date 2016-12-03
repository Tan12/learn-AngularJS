/**
 * Created by Administrator on 2016/12/3 0003.
 */
var app = angular.module('myApp', []);

app.factory('myFactory', function ($http) {
    var obj = {};
    obj.getWeather = function (cityname) {
        var url = "http://v.juhe.cn/weather/index?format=2&cityname=",
            key = "&key=4285eedd8b7bec1e65598f17c377ca62",
            cb = "&callback=JSON_CALLBACK";
        return $http.jsonp(url + cityname + key + cb);
    };
    return obj;
});

app.controller('weather', function ($scope, myFactory) {
    $scope.cityname = '南昌';
    $scope.search = function () {
        if($scope.cityname){
            myFactory.getWeather($scope.cityname).success(function (data) {
                $scope.Data = data.result;
                $scope.Items = data.result.future;
                $scope.Items.shift(); // 删掉今天的那条信息
                $scope.city = $scope.cityname;
                var shows = document.getElementsByClassName('hide');
                $('.hide').show();
            });
        }
    };
});
/**
 * Created by Administrator on 2016/12/3 0003.
 */

var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    var $searchIcon = $('.glyphicon-search'),
        $form = $('.search'),
        $closeIcon = $('.glyphicon-remove'),
        $help = $('.help'),
        $result = $('.result');

    $('a').focus(function () {
        $(this).blur();
    });
    $searchIcon.click(function () {
        $(this).hide();
        $form.show().children('input').focus();
    });
    $closeIcon.click(function () {
        $form.hide().children('input').val('');
        $searchIcon.show();
        $result.hide();
        $help.show();
    });

    $scope.search = function () {
        $scope.results = [];
        $help.hide();
        $result.show();
        var title = $scope.searchTxt,
            api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=',
            cb = '&callback=JSON_CALLBACK',
            page = 'http://en.wikipedia.org/?curid=';
        $http.jsonp(api + title + cb).success(function (data) {
            var results = data.query.pages;
            angular.forEach(results, function (v, k) {
                $scope.results.push({
                    title : v.title,
                    body : v.extract,
                    page : page + v.pageid
                });
            });
        });

    };
});

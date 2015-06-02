var app = angular.module('app', ['ngRoute', 'caco.feed.filter']);

app.service('dataService', function(dateFilter) {

    this.findOne = function (key) {
        if (!(key in this.stuff)) {

            var entry = {
                date: new Date(key),
                float: null,
                cashInDrawer: null,
                pd: [],
                comments: ""
            };

            this.stuff[key] = entry;
        }
        return this.stuff[key];
    };

    this.findByDate = function (date) {
        return this.findOne(this.dateKey(date));
    };

    this.update = function (entry) {
        var key = this.getKey(entry);
        this.stuff[key] = entry;
    };

    this.dateKey = function(date) {
        return dateFilter(date, "yyyy-MM-dd");
    }

    this.getKey = function (entry) {
        return this.dateKey(entry.date);
    }

    this.stuff = {};

    this.update(
    {
        date: new Date("2015-05-21"),
        cashInDrawer: 300.34,
        float: 150.00,
        pd: [
            {
                who: "Fiona",
                what: "Wages",
                amount: 42.00
            }, {
                who: "Carlisle",
                what: "Sweets",
                amount: 123.00
            }
        ],
        comments: ""
    });

    this.update(
    {
        date: new Date("2015-05-22"),
        cashInDrawer: 312.18,
        z: 100.23, // optional
        pd: [{
            who: "Courtney",
            what: "Wages",
            amount: 28.00
        }, {
            who: "Misc",
            what: "Misc",
            amount: 1.00
        }
        ],
        comments: "forgot to ring in £1"
    });

    this.update(
    {
        date: new Date("2015-05-23"),
        cashInDrawer: 200.34,
        z: 100.23, // optional
        pd: [{
            who: "Fiona",
            what: "Wages",
            amount: 42.00
        }],
        comments: ""
    });

    this.update(
    {
        date: new Date("2015-05-24"),
        cashInDrawer: 200.34,
        z: 100.23, // optional
        pd: [{
            who: "Fiona",
            what: "Wages",
            amount: 42.00
        }, {
            who: "Misc",
            what: "Milk",
            amount: 1.00
        }],
        comments: ""
    });

    this.update(
    {
        date: new Date("2015-05-25"),
        cashInDrawer: 200.34,
        z: 100.23, // optional
        pd: [{
            who: "Fiona",
            what: "Wages",
            amount: 42.00
        }],
        comments: ""
    });
});

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'ListCtrl',
      templateUrl: 'list.html'
    })
    .when('/list', {
      controller: 'ListCtrl',
      templateUrl: 'list.html'
    })
    .when('/edit/:date', {
      controller: 'EditCtrl',
      templateUrl: 'editentry.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('EditCtrl', function($scope, $location, $routeParams, dataService) {

    $scope.$watch('currentDate', function (newValue, oldValue) {
        $scope.save();
        $scope.data = dataService.findByDate(newValue);
    });

    $scope.currentDate = new Date($routeParams.date);

    $scope.showList = function() {
        $location.path('/list');
    };

    $scope.previous = function () {
        addDays(-1);
    };

    $scope.next = function () {
        addDays(1);
    };

    $scope.save = function () {
        if ($scope.data != undefined)
            dataService.update($scope.data);
    }

    function addDays(days) {
        var newDate = new Date($scope.currentDate);
        newDate.setTime(newDate.getTime() + (days * 86400000));
        $scope.currentDate = newDate;
    };
});

app.controller('ListCtrl', function($scope, $location, $filter, dataService) {
  $scope.stuff = dataService.stuff;

  $scope.editEntry = function (entry) {
    $location.path('/edit/' + dataService.getKey(entry));
  };
});

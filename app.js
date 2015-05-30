var app = angular.module('app', ['ngRoute', 'caco.feed.filter']);

app.service('dataService', function(dateFilter) {

    this.findOne = function (key) {
        return this.stuff[key];
    };

    this.findByDate = function (date) {
        return this.stuff[key];
    };

    this.update = function (entry) {
        var key = this.getKey(entry);
        this.stuff[key] = entry;
    };

    this.dateKey = function(date) {
        return dateFilter(date, "yyyy-MM-dd");
    }

    this.getKey = function (entry) {
        return dateKey(entry.date);
    }

    this.stuff = {};

    this.update(
    {
        date: new Date("2015-05-21"),
        cashInDrawer: 300.34,
        float: 150.00,
        //net: 100.34,
        z: 100.23, // optional
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
        float: 150.34,
        //net: 100.34,
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
        float: 100.00,
        //net: 100.34,
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
        float: 100.00,
        //net: 100.34,
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
        float: 100.00,
        //net: 100.34,
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

  $scope.data = dataService.findOne($routeParams.date);

  $scope.showList = function() {
    $location.path('/list');
  };

  $scope.next = function () {
      dataService.update($scope.data);
      var nextDay = new Date();
      nextDay.setTime($scope.data.date.getTime() + 86400000);
      var float = $scope.data.cashInDrawer;
      var entry = {
          date: nextDay,
          cashInDrawer: null,
          float: float,
          z: 0,
          pd: [],
          comments: ""
      };

      dataService.update(entry);
      $location.path('/edit/' + dataService.getKey(entry));
  }


});

app.controller('ListCtrl', function($scope, $location, $filter, dataService) {
  $scope.stuff = dataService.stuff;

  $scope.editEntry = function (entry) {
    $location.path('/edit/' + dataService.getKey(entry));
  };
});
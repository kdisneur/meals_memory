function MenuController($scope, $location) {
  $scope.activeClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {
      return 'active';
    } else {
      return '';
    }
  }
}

function MealFormController($scope, $timeout, $location, meal) {
  $scope.meal = meal;

  $scope.openDateSelector= function() {
    $timeout(function() {
      $scope.dateSelectorOpened = true;
    });
  };

  $scope.save = function() {
    meal.$saveOrUpdate(success, success);
  };

  $scope.remove = function() {
    meal.$remove(success, success);
  };

  success = function() {
    $location.path('/meals');
  };
}

function MealsListController($scope, meals) {
  $scope.meals           = meals;
  $scope.search_invitees = [];

  $scope.invitees = function() {
    invitees_names = [];
    meals.forEach(function(meal) {
      meal.invitees.forEach(function(invitee) {
        if (invitees_names.indexOf(invitee) < 0) {
          invitees_names.push(invitee);
        }
      });
    });

    return invitees_names;
  };

  $scope.changeInvitees = function(search_invitees) {
    $scope.search_invitees = search_invitees;
  };

  $scope.filterByInvitees = function(meal) {
    if ($scope.search_invitees.length == 0) {
      return true;
    }

    found = false;
    meal.invitees.forEach(function(invitee) {
      if ($scope.search_invitees.indexOf(invitee) !== -1) {
        found = true;
      }
    });

    return found;
  };

  $scope.mealsPartialName = function() {
    if (meals.length > 0) {
      return 'partials/meals/_meals.html';
    } else {
      return 'partials/meals/_empty.html';
    }
  };
};

var app = angular.module('meals_memory', ['mongolabResourceHttp', 'ui.bootstrap', 'tags-input']);

app.constant('MONGOLAB_CONFIG', { API_KEY: MONGODB_SETTINGS.api_key, DB_NAME: MONGODB_SETTINGS.db_name });

app.factory('Meal', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('meals');
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/meals',        { templateUrl: 'partials/meals/list.html', controller: MealsListController, resolve: { meals: function(Meal) { return  Meal.all(); }}}).
    when('/meal/new',     { templateUrl: 'partials/meals/form.html', controller: MealFormController,  resolve: { meal:  function(Meal) { return  new Meal(); }}}).
    when('/meal/:mealId', { templateUrl: 'partials/meals/form.html', controller: MealFormController,  resolve: { meal:  function(Meal, $route) { return  Meal.getById($route.current.params.mealId); }}}).
    otherwise({ redirectTo: '/meals' });
}]);

app.filter('toSentence', function() {
  return function(input) {
    if (input.length == 0) {
      return '';
    } else if (input.length == 1) {
      return input[0];
    } else {
      last_element = input[input.length - 1];
      elements     = input.slice(0, -1);
      return elements.join(', ') + ' and ' + last_element;
    }
  }
});

app.directive('chosen', function() {
  return {
    restrict: 'A',
    link:     function(scope, element, attributes) {
      scope.$watch(attributes.ngModel, function() {
        element.trigger('chosen:updated');
      });

      options = {};
      if (width = attributes.chosenWidth) {
        options['width'] = width;
      }
      element.chosen(options);
    }
  };
});

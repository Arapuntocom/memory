'use strict';

angular.module('draw', ['ngRoute', 'ui.router','ngMaterial'])

.controller('DrawController', function($scope, $timeout, $mdSidenav, $log, $mdDialog) {
	console.log("DrawController is here!!!");
	console.log("arbolito is here!!!");
	$scope.toggleTree = buildDelayedToggler('tree');
    $scope.toggleModelo = buildToggler('propertiesNav');
    $scope.toggleCC = buildToggler('CCNav');
    $scope.toggleEnlace = buildToggler('enlaceNav');
    $scope.toggleCondicional = buildToggler('condNav');
    
    $scope.enlace = {
    	'rotulo': ""
    };

    $scope.isOpenRight = function(navID){
      return $mdSidenav(navID).isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }


	$scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: '/view/panel-conditions.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	  };

	  function DialogController($scope, $mdDialog) {
	    $scope.hide = function() {
	      $mdDialog.hide();
	    };
	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };
	    $scope.answer = function(answer) {
	      $mdDialog.hide(answer);
	    };
	  }

  })

  .controller('TreeCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('tree').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })

  .controller('PropertiesNavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('propertiesNav').close()
        .then(function () {
          $log.debug("close propertiesNav is done");
        });
    };
  })

  .controller('CCNavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('CCNav').close()
        .then(function () {
          $log.debug("close CCNav is done");
        });
    };
  })

  .controller('EnlaceNavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('enlaceNav').close()
        .then(function () {
          $log.debug("close enlaceNav is done");
        });
    };
  })

  .controller('CondNavCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('condNav').close()
        .then(function () {
          $log.debug("close condNav is done");
        });
    };
  })

  .controller('SelectAsyncRolController', function($timeout, $scope) {
  $scope.user = null;
  $scope.users = null;
  $scope.loadUsers = function() {
    // Use timeout to simulate a 650ms request.
    return $timeout(function() {
      $scope.users =  $scope.users  || [
        { id: 1, name: 'Scooby Doo' },
        { id: 2, name: 'Shaggy Rodgers' },
        { id: 3, name: 'Fred Jones' },
        { id: 4, name: 'Daphne Blake' },
        { id: 5, name: 'Velma Dinkley' }
      ];
    }, 650);
  };
})

  .controller('SelectAsyncPtoEnterController', function($timeout, $scope) {
  $scope.pto = null;
  $scope.ptos = null;
  $scope.loadPuntos = function() {
    // Use timeout to simulate a 650ms request.
    return $timeout(function() {
      $scope.ptos =  $scope.ptos  || [
        { id: 1, name: 'Preparación' },
        { id: 2, name: 'Negociación' },
        { id: 3, name: 'Realización' },
        { id: 4, name: 'Satisfacción' }
      ];
    }, 650);
  };
})

  ;
var app = angular.module('myApp', [ "ngRoute" ]);
app.service('shareDataService', function() {
  var myList = [];

  var addList = function(newObj) {
      myList.push(newObj);
  }

  var getList = function(){
      return myList;
  }

  return {
    addList: addList,
    getList: getList
  };

});
app.config(function($routeProvider) {
	
	$routeProvider.when("/", {
		templateUrl : "gettestcases"
	}).when("/suiteform", {
        templateUrl: "suiteform"
    }).when("/pageobjects", {		
		templateUrl : "pageobjects"
	}).when("/results", {		
		templateUrl : "getResults"
	}).when('/suitedrag', {
        templateUrl: 'suitedrag'
    }).when('/testcasesubmitreq', {
        templateUrl: 'testcasesubmitreq'
    }).when('/home', {
		templateUrl : 'home.html',
		controller : 'home',
		controllerAs: 'controller'
	}).when('/login', {
		templateUrl : 'login.html',
		controller : 'navigation',
		controllerAs: 'controller'
	}).otherwise('/');
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}).controller('navigation',

		function($rootScope, $http, $location, $route) {
			
			var self = this;

			self.tab = function(route) {
				return $route.current && route === $route.current.controller;
			};

			var authenticate = function(credentials, callback) {

				var headers = credentials ? {
					authorization : "Basic "
							+ btoa(credentials.username + ":"
									+ credentials.password)
				} : {};

				$http.get('user', {
					headers : headers
				}).then(function(response) {
					if (response.data.name) {
						$rootScope.authenticated = true;
					} else {
						$rootScope.authenticated = false;
					}
					callback && callback($rootScope.authenticated);
				}, function() {
					$rootScope.authenticated = false;
					callback && callback(false);
				});

			}

			authenticate();

			self.credentials = {};
			self.login = function() {
				authenticate(self.credentials, function(authenticated) {
					if (authenticated) {
						console.log("Login succeeded")
						$location.path("/");
						self.error = false;
						$rootScope.authenticated = true;
					} else {
						console.log("Login failed")
						$location.path("/login");
						self.error = true;
						$rootScope.authenticated = false;
					}
				})
			};

			self.logout = function() {
				$http.post('logout', {}).finally(function() {
					$rootScope.authenticated = false;
					$location.path("/");
				});
			}

		});


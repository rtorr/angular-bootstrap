'use strict';


var app = window.app = angular.module('app', []);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'indexController'
      });
  });

/* Order and include as you please. */
require('scripts/directives/*');
require('scripts/controllers/*');
require('scripts/services/*');
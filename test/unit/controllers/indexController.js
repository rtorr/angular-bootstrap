'use strict';

describe('Controller: indexController', function () {

  // load the controller's module
  beforeEach(module('app'));

  var splashController,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    splashController = $controller('indexController', {
      $scope: scope
    });

  }));

  describe('/ set defaults, no options are choosen', function(){

    it('a bunch of empty data', function () {
      expect(scope.helloWorld).toEqual('Hello World');
    });


  });


});
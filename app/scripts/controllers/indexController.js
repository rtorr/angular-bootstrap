'use strict';

/*global app */


app.controller('indexController', function ($scope, bbModel) {

  $scope.helloWorld = 'Hello World';

  $scope.people = bbModel.People.models;

  $scope.add = function(name){
    bbModel.addPerson(name);
  };

  //Layout stuff
  $scope.templates = {

  };

});
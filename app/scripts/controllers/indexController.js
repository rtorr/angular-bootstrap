'use strict';

/*global app */


app.controller('indexController', function ($scope, bbModel, bbView) {

  $scope.h = {added: "None yet. Go add something!", scope: $scope};
  var a = new bbView.view($scope.h);


  $scope.helloWorld = 'Hello World';

  $scope.people = bbModel.People.models;

  $scope.add = function(name){
    bbModel.addPerson(name);
    $scope.h.added = name;
    var a = new bbView.view($scope.h);
  };

  //Layout stuff
  $scope.templates = {

  };

});
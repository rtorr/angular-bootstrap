'use strict';

/*global app */


app.controller('indexController', function ($scope, bbModel, bbView) {

  //drawCanvasService.draw();
  $scope.h = {hi: "Hi", scope: $scope};
  var a = new bbView.view($scope.h);


  $scope.helloWorld = 'Hello World';

  $scope.people = bbModel.People.models;

  $scope.add = function(name){
    bbModel.addPerson(name);
    $scope.h.hi = name;
    var a = new bbView.view($scope.h);
  };

  //Layout stuff
  $scope.templates = {

  };

});
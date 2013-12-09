'use strict';

/*global app */


app.controller('indexController', function ($scope, bbModel, bbView) {

  $scope.helloWorld = 'Hello World';

  $scope.people = bbModel.People.models;

  $scope.data = {model: $scope.people, scope: $scope};

  var a = new bbView.view($scope.data);

  $scope.add = function(name){
    bbModel.addPerson(name);
    a.render();
  };

});
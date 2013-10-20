'use strict';

/*global app */

app.controller('indexController', function ($scope, layoutService) {

  $scope.helloWorld = 'Hello World';

  //Layout stuff
  $scope.templates = {

    header: {
      title: layoutService.header.title,
      url: layoutService.header.url
    }

  };

});
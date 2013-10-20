'use strict';

/*global app */

app.controller('indexController', function ($scope, layoutService, apiService) {

  $scope.redditLinks = [];


  //This function call will update the above $scope property `redditLinks`
  apiService.getLinks('http://www.reddit.com/r/javascript.json?jsonp=JSON_CALLBACK', $scope, 'redditLinks');

  //Layout stuff
  $scope.templates = {

    header: {
      title: layoutService.header.title,
      url: layoutService.header.url
    }

  };

});
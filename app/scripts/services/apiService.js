
'use-strict';

/*global app */

app.service('apiService', function($http){

  this.getLinks = function(url, $scope, scopeName){
    $http.jsonp(url)
      .success(function (data) {
        return data;
      }).then(function(data){
        $scope[scopeName] = data.data.data.children;
      });
  };

});
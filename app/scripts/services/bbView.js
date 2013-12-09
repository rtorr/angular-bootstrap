'use strict';

/*global app, $, Backbone, _ */

app.service('bbView', function ($timeout, $compile) {

  var Bookmark = Backbone.View.extend({

    el: angular.element($("#bb")),

    initialize: function(options){
      this.options = options;
      this.render();
    },
    render: function(){
      var _this = this;
      var template = _.template( '<p><%= hi %></p><p>{{helloWorld}}</p>', this.options);
      $compile(_this.$el.html( template ))(_this.options.scope);
    }

  });

  this.view = Bookmark;

});
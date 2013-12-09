'use strict';

/*global app, Backbone, _ */

app.service('bbView', function ($timeout, $compile) {

  var BackboneView = Backbone.View.extend({

    el: angular.element("#bb"),

    initialize: function(options){
      this.options = options;
      this.render();
    },

    render: function(){
      var _this = this;
      var html = '<p>Latest added to backbone collection: <strong><%= model[model.length-1].attributes.name %></strong></p>'+
                 '<p>Bound to Angular input above: <strong>{{helloWorld}}</strong></p>';
      var template = _.template( html, this.options);
      $compile(_this.$el.html( template ))(_this.options.scope);
    }

  });

  this.view = BackboneView;

});
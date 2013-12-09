'use strict';

/*global app, Backbone */


app.service('bbModel', function () {

  var Person = Backbone.Model.extend({

    defaults: {
      "name":  "",
      "age": ""
    }

  });

  this.People = new Backbone.Collection([], {
    model: Person
  });

  this.addPerson = function(name){
    var p = new Person({name:name});
    this.People.push(p);
  };

  var b = "bob";
  var c = "sal";

  this.addPerson(b);
  this.addPerson(c);

  var d = this.People.get("c1");

  d.set({name: "calvin"});

});
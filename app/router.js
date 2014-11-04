import Ember from 'ember';

var Router = Ember.Router.extend({
  location: LookiesENV.locationType
});

Router.map(function() {

  this.resource('lookies', { path: "lookies" });
  this.resource('lookie',  { path: "lookies/:lookie_id" });


  this.resource('color-wheel');

});

export default Router;

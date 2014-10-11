import Ember from 'ember';

var Router = Ember.Router.extend({
  location: LookiesENV.locationType
});

Router.map(function() {

  this.resource('lookies');

  this.resource('lookie', { path: '/lookies/:id' }, function() {
    this.route('edit');
  });

});

export default Router;

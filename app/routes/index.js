import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    console.log("asdf");
    this.transitionTo('lookies');
  }
});

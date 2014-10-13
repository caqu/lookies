import Ember from 'ember';

export default Ember.Route.extend({
  model: function (lookie_id) {
    return this.store.find('lookie', lookie_id);
  }
});

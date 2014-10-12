import Ember from 'ember';

export default Ember.View.extend({
  click: function(evt) {
    // console.log(evt);
    this.get('controller').send('createTag', evt.clientX, evt.clientY);
  }
});

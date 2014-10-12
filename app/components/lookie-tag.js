import Ember from 'ember';

export default Ember.Component.extend({
  styleWithPosition: function() {
    return "left:"+this.get('left')+"px;"+"top:"+this.get('top')+"px";
  }.property()
});

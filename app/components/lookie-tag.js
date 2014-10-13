/**
 * app/components/lookie-tag.js
 */
import Ember from 'ember';

export default Ember.Component.extend({
  styleWithPosition: function() {
    var calcLeft = this.get('leftBlackBarWidth') + this.get('ratioFromLeft') * this.get('lookieWidth'),
        calcTop  = this.get('topBlackBarHeight') + this.get('ratioFromTop' ) * this.get('lookieHeight');
    return "left:"+calcLeft+"px;"+"top:"+calcTop+"px";
  }.property('leftBlackBarWidth', 'topBlackBarHeight', 'lookieHeight', 'lookieWidth'),

  click: function () {
    debugger;
    var href = decodeURIComponent( this.get('href').get('url') )
    this.sendAction('action', href);
  }
});

/**
 * app/components/lookie-tag.js
 */
import Ember from 'ember';

export default Ember.Component.extend({
  styleWithPosition: function() {
    var calcLeft = this.get('leftBlackBarWidth') + this.get('ratioFromLeft') * this.get('lookieWidth'),
        calcTop  = this.get('topBlackBarHeight') + this.get('ratioFromTop' ) * this.get('lookieHeight');
console.log("calcLeft", calcLeft);
    return "left:"+calcLeft+"px;"+"top:"+calcTop+"px";
  }.property('leftBlackBarWidth', 'topBlackBarHeight', 'lookieHeight', 'lookieWidth'),

  click: function () {
    // TODO prevent error if href is null
    var href = decodeURIComponent( this.get('href').get('url') );
    this.sendAction('action', href);
  }
});

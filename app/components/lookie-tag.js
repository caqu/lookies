/**
 * app/components/lookie-tag.js
 */
import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'a',
  classNames: ['tag', 'glyphicon', 'glyphicon-plus-sign', 'clickable'],

  attributeBindings: ['href', 'style'],

  href: function () {
    var h = this.get('productHref');
    h = h? h.get('id') : '';
    h = decodeURIComponent( h );
    return h; 
  }.property('productHref'),

  style: function() {
    var calcLeft = this.get('leftBlackBarWidth') + this.get('ratioFromLeft') * this.get('lookieWidth') |0,
        calcTop  = this.get('topBlackBarHeight') + this.get('ratioFromTop' ) * this.get('lookieHeight')|0;

console.log("calcLeft", calcLeft);
    return "left:"+calcLeft+"px;"+"top:"+calcTop+"px";
  }.property('leftBlackBarWidth', 'topBlackBarHeight', 'lookieHeight', 'lookieWidth'),

  // click: function () {
  //   // TODO prevent error if href is null
  //   var href = decodeURIComponent( this.get('href').get('url') );
  //   this.sendAction('action', href);
  // }
});

/**
 * app/components/lookie-tag.js
 */
import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'a',
  classNames: ['tag', 'glyphicon', 'glyphicon-plus-sign', 'clickable'],

  attributeBindings: ['href', 'style'],

  href: function () {
    if (this.get('isEditing')) {
      return "javascript:;";
    }
    var h = this.get('productHref');
    h = h? h.get('id') : '';
    h = decodeURIComponent( h );
    return h;
  }.property('productHref', 'isEditing'),
  
  click: function() {
    if (this.get('isEditing')) {
      // Default 'action', like "editLookie"
      this.sendAction('action', this);
      // Prevent bubbling
      return false;
    }
  },

  style: function() {
    var calcLeft = this.get('leftBlackBarWidth') + this.get('ratioFromLeft') * this.get('lookieWidth') |0,
        calcTop  = this.get('topBlackBarHeight') + this.get('ratioFromTop' ) * this.get('lookieHeight')|0;

    return "left:"+calcLeft+"px;"+"top:"+calcTop+"px";

  }.property('leftBlackBarWidth', 'topBlackBarHeight', 'lookieHeight', 'lookieWidth', 'ratioFromLeft', 'ratioFromTop'),

  // Defaults
  leftBlackBarWidth: 0,
  topBlackBarHeight: 0, 
  lookieHeight: 0,
  lookieWidth: 0,
  ratioFromLeft: 0,
  ratioFromTop: 0

});

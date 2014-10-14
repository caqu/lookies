import Ember from 'ember';

export default Ember.View.extend({

  init: function () {
    this._super();
    var view = this;
    $(document).ready(updateSizes);
    $(window).bind('resize', updateSizes);
    $(document.body).bind('resize', updateSizes);
    
    function updateSizes () {
      console.log( "tis", this);
      view.updateSizes();
    }
  },
  
  updateSizes: function () {
    this.set('viewportHeight', window.innerHeight);
    this.set('viewportWidth', window.innerWidth);
    this.set('bodyWidth', document.body.offsetWidth);
    this.set('bodyHeight', document.body.offsetHeight);    
  },

  didInsertElement: function () {
    this.updateSizes();
  },

  viewportHeight: function () {
    return window.innerHeight;
  }.property(),
  viewportWidth: function () {
    return window.innerWidth;
  }.property(),
  bodyWidth: function () {
    return document.body.offsetWidth;
  }.property(),
  bodyHeight: function () {
    return document.body.offsetHeight;
  }.property()

});

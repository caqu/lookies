import Ember from 'ember';

export default Ember.View.extend({

  init: function () {
    this._super();
    var view = this;
    $(document).ready(updateSizes);
    $(window).bind('resize', updateSizes);
    $(document.body).bind('resize', updateSizes);    
    function updateSizes () {
      view.updateSizes();
    }

    // Listen for orientation changes
    window.addEventListener("orientationchange", function(event) {
      // Announce the new orientation number
      console.log("orientation", event.orientation);
      view.set("orientation", event.orientation);
    }, false);
  },
  
  updateSizes: function () {
    this.set('outerHeight', window.outerHeight);
    this.set('outerWidth', window.outerWidth);
    this.set('innerHeight', window.innerHeight);
    this.set('innerWidth', window.innerWidth);
    this.set('bodyWidth', document.body.offsetWidth);
    this.set('bodyHeight', document.body.offsetHeight);    
  },

  didInsertElement: function () {
    this.updateSizes();
  },

  orientation: function () {
    return window.orientation;
  }.property(),

  outerWidth: function () {
    return window.outerWidth;
  }.property(),
  outerHeight: function () {
    return window.outerHeight;
  }.property(),

  innerWidth: function () {
    return window.innerWidth;
  }.property(),
  innerHeight: function () {
    return window.innerHeight;
  }.property(),

  bodyWidth: function () {
    return document.body.offsetWidth;
  }.property(),
  bodyHeight: function () {
    return document.body.offsetHeight;
  }.property()

});

import Ember from 'ember';

export default Ember.View.extend({

  init: function () {
    this._super();
    var view = this;
    $(window).bind('resize', function (){
      // view.set('viewport', window.innerHeight+""+window.innerWidth);
      view.set('viewportHeight', window.innerHeight);
      view.set('viewportWidth', window.innerWidth);
    });
  },
  
  viewportHeight: function () {
    return window.innerHeight;
  }.property(),
  viewportWidth: function () {
    return window.innerWidth;
  }.property()
});

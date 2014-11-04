import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'canvas',
  classNames: ['swatch'],
  attributeBindings: ['width', 'height'],
  width: 52,
  height: 52,

  didInsertElement: function() {
    // Set ctx after the element is added to the dom
    this.set('ctx', this.get('element').getContext('2d'));
    this._empty();
    this.drawSwatch();
  },
  
  drawSwatch: function() {
    var component = this;
    this._empty();
    var ctx = this.get('ctx');
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 52, 52);
      component._extractData();
    };
    img.src = this.get('src');
  }.observes('width', 'height', 'src'),
  
  _empty: function() {
    var ctx = this.get('ctx');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, this.get('width'), this.get('height'));
  },

  _extractData: function () {
    this.set('red', 256);
    this.set('green', 256);
    this.set('blue', 256);
    this.set('hue', 256);
    this.set('saturation', 256);
    this.set('lightness', 256);
  } 

});

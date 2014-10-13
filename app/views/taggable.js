import Ember from 'ember';
// import ResizeMixin from 'ember-resize-mixin/addon/main';
// export default Ember.View.extend(ResizeMixin, {

export default Ember.View.extend({
  /**
   * Lifecycle hook - called when view is created.
   * Note: this is a private method in ember, so make sure to
   * call `this._super()` before doing anything.
   */
  init: function () {
    this._super();
    var view = this;
    $(window).bind('resize', function (){
      view.handleResize();
    });
  },

  /**
   * View lifecycle hook - called when the view enters the DOM
   */
  didInsertElement: function () {

    var view = this,
        target =   $('#'+this.elementId)[0],
        bg_image = $(target).find(".lookie").css('background-image'),
        // Remove url("") to get the url
        image_url = bg_image.replace(/^url\("?(.+?)"?\)$/, '$1'),
        image = new Image();

    $(image).load(function() {
      var loadedImage = this;
      view.set('loadedImageHeight', loadedImage.height);
      view.set('loadedImageWidth', loadedImage.width);
      view.recalculateSizes();
    });
    image.src = image_url;
  },

  loadedImageHeight: 0,
  loadedImageWidth: 0,
  
  handleResize: function () {
    // recalcs
    console.log("Resizing the window.");
    this.recalculateSizes();

  },//.bind(this),
  
  recalculateSizes: function() {
    var view = this,
        target = $('#'+this.elementId)[0],
        stretchedWidth = target.offsetWidth,
        stretchedHeight = target.offsetHeight,
        leftBlackBarWidth = 0,
        topBlackBarHeight = 0;

    var isShowingVerticalBars = target.offsetWidth /target.offsetHeight > this.get('loadedImageWidth') /this.get('loadedImageHeight');
    if (isShowingVerticalBars) {
      stretchedWidth = this.get('loadedImageWidth') /this.get('loadedImageHeight') * target.offsetHeight;
      leftBlackBarWidth = (target.offsetWidth - stretchedWidth) / 2 | 0;
    } else {
      stretchedHeight = this.get('loadedImageHeight') /this.get('loadedImageWidth') * target.offsetWidth;
      topBlackBarHeight = (target.offsetHeight - stretchedHeight) / 2 | 0;
    }
    view.set('leftBlackBarWidth', leftBlackBarWidth);
    view.set('topBlackBarHeight', topBlackBarHeight);
    view.set('lookieWidth', stretchedWidth);
    view.set('lookieHeight', stretchedHeight);
  },
  //
  leftBlackBarWidth: function () { return 0; }.property(),
  topBlackBarHeight: function () { return 0; }.property(),
  
  //
  lookieWidth: function () { return window.innerWidth; }.property(),
  lookieHeight: function () { return window.innerHeight; }.property(),

  /**
    On click, send the action to create the tagm but first,
      calculate where the tag will be placed relative to the
      top and left edges. The coordinate values will be a ratio
      distance from the left-edge of the photo divided by width,
      and distance from the top-edge divided by the height.

      TODO remove this duplicate code, use more fns from above
   */
  click: function(evt) {

    // Is is not editing, don't handle the click which creates a new tag.
    if ( !this.get('controller.isEditing') ) { return; }

    // Figure the position of the click, to save it to the new tag.
    var target = evt.currentTarget,
        bg_image = $(target).find(".lookie").css('background-image'),
        // Remove url("") to get the url
        image_url = bg_image.replace(/^url\("?(.+?)"?\)$/, '$1'),
        image = new Image(),
        leftBlackBarWidth = 0,
        topBlackBarHeight = 0,
        stretchedWidth = target.offsetWidth,
        stretchedHeight = target.offsetHeight;

    image.src = image_url;

    if (this.get('loadedImageWidth') === 0) { window.console.log("There was a problem getting the image."); }

    var isShowingVerticalBars = target.offsetWidth /target.offsetHeight > this.get('loadedImageWidth') /this.get('loadedImageHeight');
    if (isShowingVerticalBars) {
      stretchedWidth = this.get('loadedImageWidth') /this.get('loadedImageHeight') * target.offsetHeight;
      leftBlackBarWidth = (target.offsetWidth - stretchedWidth) / 2 | 0;
    } else {
      stretchedHeight = this.get('loadedImageHeight') /this.get('loadedImageWidth') * target.offsetWidth;
      topBlackBarHeight = (target.offsetHeight - stretchedHeight) / 2 | 0;
    }

    // Percent from the left, not counting the black bar
    var x = (evt.clientX - leftBlackBarWidth) / stretchedWidth; // drop decimals with |0;

    // Percent from the top, not counting the black bar
    var y = (evt.clientY - topBlackBarHeight) / stretchedHeight;

    this.get('controller').send('createTag', x, y);
  }

});

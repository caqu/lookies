/**
 * app/controllers/lookie.js
 * 
 * A lookie is a photo portrait that showcases products.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

  // Seen when the lookie viewport is wider than the image
  leftBlackBarWidth: function () {

  }.property(),

  // Seen when the lookie viewport is taller than the image
  topBlackBarHeight: function () {

  }.property(),

  actions: {

    /**
     * A lookie can be tagged with a product.
     * @param x value from 0 to 1 of the x-coord relative to the left edge
     * @param y value from 0 to 1 of the y-coord relative to the top edge
     */
    createTag: function (x, y, productId) {
      var store = this.store,
          lookie = this.get('model'),
          newTag = store.createRecord('tag', {
            lookie: lookie,
            // product: product,
            ratioFromLeft: x,
            ratioFromTop:  y
          });
      // Create and save tag, and update the lookie's ref to the tag
      lookie.get('tags').then(function(tags) {
        tags.addObject(newTag);
        lookie.save();
        newTag.save();
      });
    },

    linkTagWithProduct: function () {
      // debugger;
      // productId = "1305_8766_012";
      // var store = this.store;

      // var product = store.find("product", productId).
      //   then(
      //     function recordDidLoad(){}, 
      //     function recordFailedToLoad() {
      //       debugger;
      //       return store.createRecord("product", {
      //         "id": productId
      //       }).save();
      //     });
    }



  }
});

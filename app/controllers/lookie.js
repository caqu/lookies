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
  
  // whether the lookie can be tagged, and clicking on tags edits or navigates  
  isEditing: true,

  // Between user click to create tag and saving the product url
  isTagging: false,

  // Reference to the tag that was created last
  lastTag: null,

  actions: {

    /**
     * A lookie can be tagged with a product.
     * @param x value from 0 to 1 of the x-coord relative to the left edge
     * @param y value from 0 to 1 of the y-coord relative to the top edge
     */
    createTag: function (x, y) {
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

      this.set("isTagging", true);
      this.set("lastTag", newTag);
    },
    
    addLinkFromTagToProduct: function () {
      console.log("addLinkFromTagToProduct");

      // debugger;
      var productUrl = this.get('newProductURL');
      var productUrlAsId = encodeURIComponent(productUrl).replace(/\./g, '%2E');
      var store = this.store;
      var lastTag = this.get('lastTag');

      // Find or create product, then assign tags to it
      var product = store.find("product", productUrlAsId).then(
                      // Add tags to existing product
                      function recordDidLoad(product){
                        debugger;
                        product.get('tags').then(function(tags) {
                          tags.addObject(lastTag);
                          product.save();
                        });
                      },
                      // Create product and add the first tag
                      function recordFailedToLoad() {
                        debugger;
                        return store.createRecord("product", {
                          "id": productUrlAsId,
                          "url": productUrlAsId
                          // ,"tags": [lastTag]
                        }).save();
                      }
                    );
    }



  }
});

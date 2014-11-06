/**
 * app/controllers/lookie.js
 * 
 * A lookie is a photo portrait that showcases products.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  
  // Whether the lookie can be tagged, and clicking on tags edits or navigates  
  isEditing: false,

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
      });

      this.set("isTagging", true);
      this.set("lastTag", newTag);
    },
    
    addLinkFromTagToProduct: function () {
      console.log("addLinkFromTagToProduct");

      var productUrl = this.get('newProductURL');
      var productUrlAsId = encodeURIComponent(productUrl).replace(/\./g, '%2E');
      var store = this.store;
      var lastTag = this.get('lastTag');
      var that = this;

      // Find or create product, then assign tags to it
      store.find("product", productUrlAsId).then(
        // Add tags to existing product
        function recordDidLoad(product){
          _saveProduct(product);
        },
        // Create product and add the first tag
        function recordFailedToLoad() {
          var product = store.createRecord("product", {
            "id": productUrlAsId,
            "url": productUrlAsId
          });
          _saveProduct(product);
        }
      );
      
      function _saveProduct (product) {
        product.get('tags').addObject(lastTag).save();
        lastTag.save();
        product.save().then(function () {
          that.set('isTagging', false);
        });
      }

    },

    /**
     * Navigate to tagged link
     */
    editLookie: function (tagComponent) {
      this.set('isTagging', true);
      this.set("lastTag", tagComponent);
    },

    deleteTag: function () {
      this.get("lastTag");
      debugger;
    },

    closeEditTagDialog: function () {
      this.set('isTagging', false);
    }

  }
});

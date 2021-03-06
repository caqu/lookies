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

  productURL: function () {
    var lastTag = this.get('lastTag');
    if ( lastTag ) {
      var product = lastTag.productHref;
      if ( product && product.get('url') ) {
        return decodeURIComponent( product.get('url') );
      }
    }
    return '';
  }.property('lastTag'),

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

    saveTag: function () {
      var productUrl = this.get('productURL');
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

    _deleteTag: function () {
      var tag = this.get('lastTag'),
          tagIsNotSaved = !!tag.id,
          tagIsSaved = !!tag.elementId;
      if ( tagIsNotSaved ) {
        this.store.find('tag', tag.id).then(function (tag) {
          tag.deleteRecord();
        });
      } else if ( tagIsSaved ) {
        this.store.find('tag', tag.elementId).then(function (tag) {
          tag.destroyRecord();
        });
      }
    },

    deleteTag: function () {
      this.send('_deleteTag');
      this.set('isTagging', false);
    },

    closeEditTagDialog: function () {
      // hide the edit-tag-dialog box
      this.set('isTagging', false);
      // delete the tag if it wasn't saved
      var tag = this.get('lastTag');
      if ( tag.id ) { 
        this.store.find('tag', tag.id).then(function (tag) {
          if (!tag.get('product')) {
            tag.deleteRecord();
          }
        });
      }
    }

  }
});

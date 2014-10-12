/**
 * app/controllers/lookie.js
 * 
 * A lookie is a photo portrait that showcases products.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    /**
     * A lookie can be tagged with a product.
     */
    createTag: function (x, y, productId) {
      var store = this.store;

      // debugger;
      var lookie = this.get('model');

      // Persist tag
      store.createRecord('tag', {
        lookie: this.get('model'),
        // product: product,
        ratioFromLeft: x,
        ratioFromTop:  y
      }).save().then(function(){

        lookie.save();
        
      });


      // Persist the tag in the store
      // this.get('model').get('tags').addObject( newTag ).save();

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

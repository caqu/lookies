import Ember from 'ember';

export default Ember.ArrayController.extend({

  newLookieURL: "",

  actions: {

    createLookie: function () {
      
      var newLookieURL = this.get('newLookieURL');

      var newLookie = this.store.createRecord('lookie', {
        url: newLookieURL
      });
      
      newLookie.save();

    },

    deleteLookie: function (lookieRecord) {
      
      Ember.assert("Lookie is of 'type' 'lookie'", lookieRecord.get('constructor.typeKey') === 'lookie');

      lookieRecord.destroyRecord();

    }

  }

});

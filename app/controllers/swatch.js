import Ember from 'ember';

export default Ember.Controller.extend({

  swatchFilePath: function () {
    return "/swatches/" + this.get('content.id') + "_s.jpeg";
  }.property('id')

});

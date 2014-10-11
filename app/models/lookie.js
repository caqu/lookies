import DS from 'ember-data';

export default DS.Model.extend({

  url: DS.attr('string'),      // The url to the photo

  backgroundUrl: function () {
    return "background-image:url('" + this.get("url") + "')";
  }.property("url")
  
});

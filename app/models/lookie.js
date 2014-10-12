import DS from 'ember-data';

export default DS.Model.extend({

  url: DS.attr('string'),      // The url to the photo

  // tags: DS.hasMany('tag'),                   // saves, cannot not read
  tags: DS.hasMany('tag', {
    async: true,
    inverse: 'lookie'
  }),    // read, but not save

  backgroundUrl: function () {
    return "background-image:url('" + this.get("url") + "')";
  }.property("url")
  
});

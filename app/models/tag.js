import DS from 'ember-data';

export default DS.Model.extend({
  // product: DS.belongsTo('product'),
  ratioFromLeft: DS.attr('number'),
  ratioFromTop:  DS.attr('number')
});

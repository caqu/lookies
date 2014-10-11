import DS from 'ember-data';

export default DS.Model.extend({
  lookie: DS.belongsTo('lookie'),
  // product: DS.belongsTo('product'),
  ratioFromLeft: DS.attr('number'),
  ratioFromTop:  DS.attr('number')
});

import DS from 'ember-data';

export default DS.Model.extend({
  // lookie: DS.belongsTo('lookie', 
  // {
  //   async: true,
  //   inverse: 'tags'
  // }
  // ),
  // product: DS.belongsTo('product'),
  ratioFromLeft: DS.attr('number'),
  ratioFromTop:  DS.attr('number')
});

import { test, moduleForModel } from 'ember-qunit';

moduleForModel('product', 'Product', {
  // Specify the other units that are required for this test.
  needs: ['model:tag']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});

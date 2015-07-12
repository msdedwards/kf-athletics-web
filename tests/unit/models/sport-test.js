import { moduleForModel, test } from 'ember-qunit';

moduleForModel('sport', 'Unit | Model | sport', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:event', 'model:image', 'model:group', 'model:conversation']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

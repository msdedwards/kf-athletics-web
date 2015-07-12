import { moduleForModel, test } from 'ember-qunit';

moduleForModel('image', 'Unit | Model | image', {
  // Specify the other units that are required for this test.
  needs: ['model:event', 'model:sport', 'model:user', 'model:group', 'model:conversation']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

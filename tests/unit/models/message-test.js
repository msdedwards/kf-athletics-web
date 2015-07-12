import { moduleForModel, test } from 'ember-qunit';

moduleForModel('message', 'Unit | Model | message', {
  // Specify the other units that are required for this test.
  needs: ['model:conversation', 'model:user', 'model:group', 'model:image', 'model:sport', 'model:event']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
// test('create', function(assert) {
//   var model = this.subject();
//   var store = this.store();
//   var user = store.find('user', 'twitter:A632405426');
//   store.createRecord('message',{
//     text:"Hello, my name is Matt",
//     timestamp:new Date(),
//     conv
//   })
// });

import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
moduleForModel('conversation', 'Unit | Model | conversation', {
  // Specify the other units that are required for this test.
  needs: ['model:message', 'model:user', 'model:group', 'model:image', 'model:sport']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
test('create', function(assert) {
  var model = this.subject();
  var store = this.store();
  Ember.run(function(){
    var conversation = store.createRecord('conversation',{
      isGroup:false
    });
    conversation.save().then(function(conversation){
      store.find('conversation',conversation.get('id')).then(function(createdConversation){
        assert.equal(createdConversation.id, conversation.get('id'));
      });
    });
  });
});

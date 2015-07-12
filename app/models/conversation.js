import DS from 'ember-data';

export default DS.Model.extend({
  isGroup: DS.attr('boolean'),
  messages: DS.hasMany('message', {async:true}),
  users: DS.hasMany('user', {async:true}),
  groups: DS.belongsTo('group', {async:true}),
  pushMessage: function(message){
    return this.get('messages').then(function(messages){
     return messages.pushObject(message);
    });
  },
  pushUser: function(user){
    return this.get('users').then(function(users){
      return users.pushObject(user);
    });
  },
  pushGroup: function(group){
    return this.get('groups').then(function(groups){
      return groups.pushObject(group);
    });
  }
});

import DS from 'ember-data';

export default DS.Model.extend({
  text:DS.attr('string'),
  timestamp:DS.attr('date'),
  conversation:DS.belongsTo('conversation', {async:true}),
  owner: DS.belongsTo('user', {async:true})
});

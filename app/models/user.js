import DS from 'ember-data';

export default DS.Model.extend({
  provider:DS.attr('string'),
  name:DS.attr('string'),
  email:DS.attr('string'),
  created:DS.attr('date'),
  isAdmin: DS.attr('boolean'),
  isCoach: DS.attr('boolean'),
  phone: DS.attr('string'),
  gallery: DS.hasMany('image', {asyc:true}),
  groups: DS.hasMany('group', {async:true}),
  conversations: DS.hasMany('conversation', {async:true}),
  sportsPlayed: DS.hasMany('sport', {async:true, inverse:'players'}),
  sportsCoached: DS.hasMany('sport', {async:true, inverse:'coaches'}),
  logins: DS.hasMany('login', {async:true})
});

import DS from 'ember-data';

export default DS.Model.extend({
  players: DS.hasMany('user',{async:true, inverse:'sportsPlayed'}),
  coaches: DS.hasMany('user',{async:true, inverse:'sportsCoached'}),
  name: DS.attr('string'),
  schedule: DS.hasMany('event',{async:true}),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  gallery: DS.hasMany('image', {async:true})
});

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  isCompetition: DS.attr('boolean'),
  sport: DS.hasMany('sports', {async:true}),
  isMultiDay: DS.attr('boolean'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  gallery: DS.hasMany('image', {async:true}),
  location: DS.attr('string')
});

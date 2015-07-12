import DS from 'ember-data';

export default DS.Model.extend({
  members:DS.hasMany('user',{async:true}),
  name:DS.attr('string'),
});

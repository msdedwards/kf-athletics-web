import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  caption: DS.attr('string'),
  event: DS.belongsTo('event'),
  sport: DS.belongsTo('sport'),
  user: DS.belongsTo('user')
});

import DS from 'ember-data';

export default DS.Model.extend({
  rows: DS.hasMany('row')
});

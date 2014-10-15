import DS from 'ember-data';

export default DS.Model.extend({
  rowNum: DS.attr('number'),
  mines: DS.hasMany('mine')
});

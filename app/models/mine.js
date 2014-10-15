import DS from 'ember-data';

export default DS.Model.extend({
  bomb: DS.attr('boolean'),
  flag: DS.attr('boolean'),
  surroundingBombs: DS.attr(),
  checked: DS.attr('boolean'),
  colNum: DS.attr('number'),
  row: DS.belongsTo('row')
});

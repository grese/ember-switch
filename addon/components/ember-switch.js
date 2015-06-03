import Em from 'ember';
import layout from '../templates/components/ember-switch';
export default Em.Component.extend({
    layout: layout,
    classNames: ['switch-component'],
    isChecked:      false,
    isDisabled:     false,
    labelOn:        'Active',
    labelOff:       'Inactive',
    labelPosition: 'right', // left or right
    labelText: Em.computed('isChecked', 'labelOn', 'labelOff', function(){
        return this.get(this.get('isChecked') ? 'labelOn' : 'labelOff');
    }),
    _positionLeft: Em.computed('labelPosition', function(){
        return this.get('labelPosition').toLowerCase() === 'left';
    }),
    _positionClass: Em.computed('labelPosition', function(){
        switch(this.get('labelPosition')){
            case 'left':
                return 'switch-label-left';
            default:
                return 'switch-label-right';
        }
    })
});

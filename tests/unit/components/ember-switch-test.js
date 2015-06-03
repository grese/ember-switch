import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import Em from 'ember';

describeComponent('ember-switch', 'Ember Switch', {
    unit: true
}, function(){

    var labelOnText = 'LABEL ON',
        labelOffText = 'LABEL OFF';

    it('should exist, and be an Em.Component', function() {
        var component = this.subject();
        expect(component).to.be.an.instanceof(Em.Component);
    });

    it('should render', function(){
        var component = this.subject();
        this.render();
        var $component = component.$();
        expect($component.find('div.switch').length).to.eq(1);
    });

    it('should not have labelText when hideText is true', function(){
        var component = this.subject({
                hideText: true
            });
        this.render();
        var $component = component.$();
        expect($component.find('.switch-text').length).to.eq(0);
    });

    it('should have labelText when hideText is false.', function(){
        var component = this.subject();
        this.render();
        var $component = component.$();
        expect($component.find('.switch-text').length).to.eq(1);
    });

    it('should initialize with labelOn text when isChecked is true on init', function(){
        var component = this.subject({
                labelOn: labelOnText,
                isChecked: true
            });
        this.render();
        var $component = component.$();
        expect($component.find('.switch-text').text()).to.eq(labelOnText);
    });

    it('should initialize with labelOff text when isChecked is false on init', function(){
        var component = this.subject({
            labelOff: labelOffText,
            isChecked: false
        });
        this.render();
        var $component = component.$();
        expect($component.find('.switch-text').text()).to.eq(labelOffText);
    });

    it('should have a disabled checkbox when isDisabled is true', function(){
        var component = this.subject({
                isDisabled: true
            });
        this.render();
        var $component = component.$();
        expect($component.find('input.switch-checkbox').attr('disabled')).to.be.ok;
    });

    it('should NOT have a disabled checkbox when isDisabled is false', function(){
        var component = this.subject({
            isDisabled: false
        });
        this.render();
        var $component = component.$();
        expect($component.find('input.switch-checkbox').attr('disabled')).not.to.be.ok;
    });

    it('should have a for attribute on the label that points to the checkbox', function(){
        var component = this.subject();
        this.render();
        var $component = component.$();
        var id = $component.find('input.switch-checkbox').attr('id'),
            forAttr = $component.find('label.switch-label').attr('for');
        expect(forAttr).to.eq(id);
    });
});

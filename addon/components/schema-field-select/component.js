import Component from '@ember/component';
import { getWithDefault, computed } from '@ember/object';
import { isNone } from '@ember/utils';
import SchemaFieldInitializerMixin from 'ember-json-schema-views/mixins/components/schema-field-initializer';

const DEFAULT_LABEL = "Selecciona";
const DEFAULT_ATTR_NAME = "name";

export default Component.extend(SchemaFieldInitializerMixin, {
  init() {
    this._super(...arguments);
    let { key, property, document } = this.getProperties(['key', 'property', 'document']);

    if (!isNone(document.get(key))) {
      // Document has a value set, don't overwrite what is set
      return;
    }

    let initialValue;

    if (property.default) {
      // Property has a default value
      initialValue = property.default;
    } else if (!getWithDefault(property, 'displayProperties.prompt', false)) {
      // No Prompt
      initialValue = property.validValues[0];
    }

    document.set(key, initialValue);
    this.set('value', initialValue);
  },

  label: computed('property.displayProperties.labels.label', function(){
    return `${this.get('property.displayProperties.labels.trueLabel') || DEFAULT_LABEL}`;
  }),

  attr: computed('property.displayProperties.optionDisplayAttribute', function(){
    return `${this.get('property.displayProperties.optionDisplayAttributel') || DEFAULT_ATTR_NAME}`;
  }),

  classNames: ['schema-field-component', 'schema-field-select'],
  getCurrentValue() {
    return this.send('change', this.get('value'));
  },
  actions: {
    change(option){
      return this.send('update', option);  // eslint-disable-line ember/closure-actions
    }
  }
});
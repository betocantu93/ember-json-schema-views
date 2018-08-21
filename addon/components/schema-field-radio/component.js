import Component from '@ember/component';
import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';

export const DEFAULT_TRUE_LABEL = 'True';
export const DEFAULT_FALSE_LABEL = 'False';

export default Component.extend({
  classNames: ['schema-field-component', 'schema-field-radio'],
  init() {
    this._super(...arguments);
    let key = this.get('key');
    let document = this.get('document');
    let defaultValue = this.get('property.default');

    schedule('afterRender', () => {
      let initialValue =  null;
      let documentValue = document.get(key);

      if (typeof defaultValue !== 'undefined') {
        initialValue = defaultValue;
      }

      if (typeof documentValue !== 'undefined') {
        initialValue = documentValue;
      }

      if (initialValue !== null) {
        this.set('value', initialValue);
        document.set(key, initialValue);
      }
    });
  },

  trueLabel: computed('property.displayProperties.labels.trueLabel', function() {
    return this.get('property.displayProperties.labels.trueLabel') || DEFAULT_TRUE_LABEL;
  }),

  falseLabel: computed('property.displayProperties.labels.falseLabel', function() {
    return this.get('property.displayProperties.labels.falseLabel') || DEFAULT_FALSE_LABEL;
  }),

  actions: {
    changed(value) {
      let document = this.get('document');
      let key = this.get('key');

      document.set(key, value);
      this.set('value', value);
      this.sendAction('changed', value);  // eslint-disable-line ember/closure-actions
    }
  }
});
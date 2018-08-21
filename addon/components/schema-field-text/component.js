import Component from '@ember/component';
import SchemaFieldInitializerMixin from 'ember-json-schema-views/mixins/components/schema-field-initializer';
import { computed } from '@ember/object';

const TYPE = "text";

export default Component.extend(SchemaFieldInitializerMixin, {
  classNames: ['schema-field-component', 'schema-field-text'],

  type: computed('property.displayProperties.type', function(){
    return `${this.get('property.displayProperties.type') || TYPE}`
  })

});
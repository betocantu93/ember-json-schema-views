import Component from '@ember/component';
import layout from '../templates/components/test-schema';
import Schema from 'ember-json-schema-document/models/schema';
import { set } from '@ember/object';

export default Component.extend({
  layout,
  init(){
    this._super(...arguments);
    var schema = new Schema(
        {
          "$id": "https://example.com/person.schema.json",
          "$schema": "http://json-schema.org/draft-07/schema#",
          "title": "Person",
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              displayProperties: {
                title: "First Name"
              },
              "description": "The person's first name."
            },
            "lastName": {
              "type": "string",
              displayProperties: {
                title: "Last Name"
              },
              "description": "The person's last name."
            },
            "age": {
              "description": "Age in years which must be equal to or greater than zero.",
              "type": "integer",
              displayProperties: {
                title: "Age"
              },
              displayProperties: {
                type: "number"
              },
              "minimum": 0
            },
            "radio": {
              "type": "boolean",
              displayProperties: {
                title: "Gender",
                labels: {
                  trueLabel: "Male",
                  falseLabel: "Female"
                }
              },
              "description": "The person's first name.",
            },
            "toggle": {
              "type": "boolean",
              displayProperties: {
                useToggle: true,
                title: "Equipo",
                labels: {
                  trueLabel: "Rayado",
                  falseLabel: "Tigre"
                }
              },
              "description": "The person's first name.",
            },
            "checkboxes": {
              "type": "array",
              displayProperties: {
                title: "Comidas Favoritas",
              },
              "description": "The person's first name.",
                items: {
                  type: "string",
                  enum: ["Carne Asada","Pizza", "Ensalada"]
              },
            },
            "select": {
              "description": "The person's first name.",
              type: "string",
              displayProperties: {
                title: "Municipio",
              },
              items: {
                type: "string",
                enum: ["Monterrey","San Pedro", "Escobedo"],
              },
             
            },
          }
        }
      );
      var doc = schema.buildDocument();
    
      doc.set('firstName', 'Headquarters');
      doc.set('lastName', '155 Water St');
      doc.set('age', -3);
  
      console.log(doc);
      
      let c = doc.dump();
  
      console.log(c);
     
      console.log(doc.isValid);

      set(this, 'properties', doc.properties);
      set(this, 'document', doc);
      set(this, 'documentDump', c)

},
actions: {
  documentChanged(document) {
    console.log('Dumping document values');
    this.set('documentDump', document.dump());
    console.log(document.dump());
  }
}
});
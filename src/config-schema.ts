import { Type, validator } from '@openmrs/esm-framework';

/**
 * This is the config schema. It expects a configuration object which
 * looks like this:
 *
 * ```json
 * { "casualGreeting": true, "whoToGreet": ["Mom"], "invoiceMetadata": { "supplierName": "Clinique St. Jean", "supplierIFU": "68918198911", "supplierNIM": "df57d4c3-cd94-419f-8a35-f19361615ad4" } }
 * ```
 *
 * In OpenMRS Microfrontends, all config parameters are optional. Thus,
 * all elements must have a reasonable default. A good default is one
 * that works well with the reference application.
 *
 * To understand the schema below, please read the configuration system
 * documentation:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 * Note especially the section "How do I make my module configurable?"
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config?id=im-developing-an-esm-module-how-do-i-make-it-configurable
 * and the Schema Reference
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config?id=schema-reference
 */
export const configSchema = {
  casualGreeting: {
    _type: Type.Boolean,
    _default: false,
    _description: 'Whether to use a casual greeting (or a formal one).',
  },
  whoToGreet: {
    _type: Type.Array,
    _default: ['World'],
    _description: 'Who should be greeted. Names will be separated by a comma and space.',
    _elements: {
      _type: Type.String,
    },
    _validators: [validator((v) => v.length > 0, 'At least one person must be greeted.')],
  },
  

  billingMetadata: {
    supplierName: {
      _type: Type.String,
      _default: "Centre de Santé 0",
      _description: 'The name of the invoice supplier that will be used to generate the invoice',
      _validators: [validator((v) => v.length > 0, 'Provide a name for the invoice supplier.')]
    },
    supplierIFU: {
      _type: Type.String,
      _default: null,
      _description: "The IFU of the invoice supplier",
      _validators: [
        validator((v) => v.length > 10, 'A valid IFU must be provided.'),
      ]
    },
    supplierNIM: {
      _type: Type.String,
      _default: null,
      _description: "The NIM (Device Identitication Number) of the invoice supplier. (Optional)",
      _validators: [
        validator((v) => v, 'A valid NIM must be provided.'),
      ]
    }
  },
};

export type Config = {
  casualGreeting: boolean;
  whoToGreet: Array<string>;
  billingMetadata: {
    supplierName: string;
    supplierIFU: string;
    supplierNIM: string;
  }
};

const { Schema, model } = require('mongoose');

const ClientSchema = Schema({

    party_type: {
        type: String,
        default: 'PERSONA_NATURAL'
    },
    tax_level_code: {
        type: String,
        default: 'NO_RESPONSABLE_DE_IVA'
    },
    country_code: {
        type: String,
        default: 'CO'
    },
    first_name: {
        type: String
    },
    party_identification_type: {
        type: String,
        default: 'CC'
    },
    company_name: {
        type: String
    },
    family_name: {
        type: String
    },
    regimen: {
        type: String,
        default: 'SIMPLE'
    },
    party_identification: {
        type: String
    },

    codigodepartamento: {
        type: String
    },

    codigociudad: {
        type: String
    },

    cedula: {
        type: String,
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },

    sendemail: {
        type: Boolean,
        default: true
    },

    address: {
        type: String
    },

    city: {
        type: String
    },

    department: {
        type: String
    },

    zip: {
        type: String
    },

    status: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

ClientSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.cid = _id;
    return object;

});

module.exports = model('Clients', ClientSchema);
const { Schema, model } = require('mongoose');

const PaymentsSchema = Schema({

    monto: {
        type: String,
        require: true
    },

    description: {
        type: String
    },

    type: {
        type: String,
        require: true
    },

    status: {
        type: Boolean,
        default: true
    },

    meses: {
        type: Number,
        require: true
    },
    
    nube: {
        type: Schema.Types.ObjectId,
        ref: 'Nubes',
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    fecha: {
        type: Date,
        default: Date.now
    }

});

PaymentsSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.payid = _id;
    return object;

});

module.exports = model('Payments', PaymentsSchema);
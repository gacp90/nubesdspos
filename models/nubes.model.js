const { Schema, model } = require('mongoose');

const NubesSchema = Schema({

    link: {
        type: String,
        require: true,
        unique: true
    },

    name: {
        type: String,
        require: true
    },

    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients'
    },

    phone: {
        type: String
    },

    cc: {
        type: String
    },

    price: {
        type: Number
    },

    server: {
        type: String,
    },

    db: {
        type: String,
    },

    estado: {
        type: String,
        default: 'Activa'
    },

    status: {
        type: Boolean,
        default: true
    },

    vence: {
        type: Date
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

NubesSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.nuid = _id;
    return object;

});

module.exports = model('Nubes', NubesSchema);
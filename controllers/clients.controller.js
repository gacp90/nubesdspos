const { response } = require('express');
const bcrypt = require('bcryptjs');

const Client = require('../models/clients.model');

/** ======================================================================
 *  GET CLIENTS
=========================================================================*/
const getClients = async(req, res) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [clients, total] = await Promise.all([
            Client.find(query)
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Client.countDocuments()
        ]);

        res.json({
            ok: true,
            clients,
            total
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });

    }


};

/** =====================================================================
 *  GET CLIENT ID
=========================================================================*/
const getClientId = async(req, res = response) => {

    try {
        const id = req.params.id;

        const clientDB = await Client.findById(id);
        if (!clientDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este cliente, porfavor intente nuevamente.'
            });
        }

        res.json({
            ok: true,
            client: clientDB
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  CREATE CLIENT
=========================================================================*/
const createClient = async(req, res = response) => {

    try {


        let clientNew = new Client(req.body);
        clientNew.email = clientNew.email.trim().toLowerCase();
        clientNew.cedula = clientNew.cedula.trim();

        // ENCRYPTAR PASSWORD
        clientNew.email = email;

        const validateCedula = await Client.findOne({ cedula: clientNew.cedula })
        if (validateCedula) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existen un cliente con este numero de cedula o nit'
            });
        }

        // SAVE CLIENT
        await clientNew.save();

        res.json({
            ok: true,
            client: clientNew
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};

/** =====================================================================
 *  UPDATE CLIENT
=========================================================================*/
const updateClient = async(req, res = response) => {

    const cid = req.params.id;

    try {

        // SEARCH CLIENT
        const clientDB = await Client.findById(cid);
        if (!clientDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun cliente con este ID'
            });
        }
        // SEARCH CLIENT

        // VALIDATE CLIENT
        const {...campos } = req.body;

        if (campos.email) {
            campos.email = campos.email.trim().toLowerCase();
        }

        if (campos.cedula) {
            campos.cedula = campos.cedula.trim();
        }

        // UPDATE
        const clientUpdate = await Client.findByIdAndUpdate(cid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            client: clientUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

};


// EXPORTS
module.exports = {
    getClients,
    createClient,
    updateClient,
    getClientId
};
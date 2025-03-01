const { response } = require('express');

const Nube = require('../models/nubes.model');

/** ======================================================================
 *  POST QUERY
=========================================================================*/
const getQueryNubes = async(req, res = response) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [nubes, total] = await Promise.all([
            Nube.find(query)
            .populate('client')
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Nube.countDocuments(query)
        ]);

        res.json({
            ok: true,
            nubes,
            total
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** ======================================================================
 *  GET ID
=========================================================================*/
const getIdNube = async(req, res = response) => {

    try {

        const nuid = req.params.id;

        const nube = await Nube.findById(nuid)
            .populate('client')

        if (!nube) {
            return res.status('400').json({
                ok: false,
                msg: 'Error, no existe ninguna nube con este ID'
            })
        }

        res.json({
            ok: true,
            nube
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** ======================================================================
 *  POST CREATE
=========================================================================*/
const createNube = async(req, res = response) => {

    try {

        const nube = new Nube(req.body);
        nube.link = nube.link.trim().toLowerCase();

        const validateLink = await Nube.findOne({ link: nube.link });
        if (validateLink) {
            return res.status(404).json({
                ok: false,
                msg: 'Ya existe una nube con este mismo link'
            })
        }

        const create = await nube.save()
        const populated = await create.populate('client');

        res.json({
            ok: true,
            nube: populated
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** ======================================================================
 *  PUT UPDATE
=========================================================================*/
const updateNube = async(req, res = response) => {

    try {

        const nuid = req.params.id;
        const campos = req.body;

        const nubeDB = await Nube.findById(nuid);
        if (!nubeDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Error, no existe ninguna nube con este ID'
            })
        }

        if (campos.link) {
            if (campos.link.trim().toLowerCase() !== nubeDB.link) {
                campos.link = campos.link.trim().toLowerCase();
                const validateLink = await Nube.findOne({ link: campos.link });
                if (validateLink && validateLink._id !== nuid) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Ya existe una nube con este mismo link'
                    })
                }
            }            
        }


        const nubeUpdate = await Nube.findByIdAndUpdate(nuid, campos, { new: true, useFindAndModify: false })

        res.json({
            ok: true,
            nube: nubeUpdate
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};


module.exports = {
    getQueryNubes,
    getIdNube,
    createNube,
    updateNube
}
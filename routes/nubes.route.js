/** =====================================================================
 *  NUBES ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES

// CONTROLLERS
const { getQueryNubes, getIdNube, createNube, updateNube } = require('../controllers/nubes.controller');

const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

/** =====================================================================
 *  GET
=========================================================================*/
router.post('/query', validarJWT, getQueryNubes);

/** =====================================================================
 *  GET NUBE ID
=========================================================================*/
router.get('/:id', validarJWT, getIdNube);

/** =====================================================================
 *  POST CREATE NUBE
=========================================================================*/
router.post('/', [
        validarJWT,
        check('link', 'El link es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createNube
);

/** =====================================================================
 *  PUT NUBE
=========================================================================*/
router.put('/:id', validarJWT, updateNube);

// EXPORT
module.exports = router;
/** =====================================================================
 *  CLIENT ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES

// CONTROLLERS
const { getClients, createClient, getClientId, updateClient } = require('../controllers/clients.controller');

const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

/** =====================================================================
 *  GET CLIENT
=========================================================================*/
router.post('/query', validarJWT, getClients);

/** =====================================================================
 *  GET CLIENT ID
=========================================================================*/
router.get('/:id', validarJWT, getClientId);

/** =====================================================================
 *  POST CREATE CLIENT
=========================================================================*/
router.post('/', [
        validarJWT,
        check('cedula', 'El usuario es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createClient
);

/** =====================================================================
 *  PUT CLIENT
=========================================================================*/
router.put('/:id', validarJWT, updateClient);



// EXPORT
module.exports = router;
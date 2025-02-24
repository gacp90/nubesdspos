/** =====================================================================
 *  PAYMENTS ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES

// CONTROLLERS
const { getPayments, createPayment, updatePayment } = require('../controllers/payments.controller');

const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

/** =====================================================================
 *  GET
=========================================================================*/
router.post('/query', validarJWT, getPayments);

/** =====================================================================
 *  POST CREATE
=========================================================================*/
router.post('/', [
        validarJWT,
        check('monto', 'El monto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createPayment
);

/** =====================================================================
 *  PUT
=========================================================================*/
router.put('/:id', validarJWT, updatePayment);

// EXPORT
module.exports = router;
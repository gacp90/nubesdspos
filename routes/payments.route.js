/** =====================================================================
 *  PAYMENTS ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');

// CONTROLLERS
const { getPayments, createPayment, updatePayment } = require('../controllers/payments.controller');


const router = Router();

router.use(expressFileUpload());

/** =====================================================================
 *  GET
=========================================================================*/
router.post('/query', validarJWT, getPayments);

/** =====================================================================
 *  POST CREATE
=========================================================================*/
router.post('/', validarJWT, createPayment);

/** =====================================================================
 *  PUT
=========================================================================*/
router.put('/:id', validarJWT, updatePayment);

// EXPORT
module.exports = router;
/** =====================================================================
 *  USER ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES

// CONTROLLERS
const { getUsers, createUsers, updateUser, deleteUser, getUserId } = require('../controllers/users.controller');

const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

/** =====================================================================
 *  GET USERS
=========================================================================*/
router.post('/query', validarJWT, getUsers);
/** =====================================================================
 *  GET USERS ID
=========================================================================*/
router.get('/user/:id', validarJWT, getUserId);
/** =====================================================================
 *  POST CREATE USER
=========================================================================*/
router.post('/', [
        validarJWT,
        check('user', 'El usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createUsers
);
/** =====================================================================
 *  PUT USER
=========================================================================*/
router.put('/:id', validarJWT, updateUser);
/** =====================================================================
 *  DELETE USER
=========================================================================*/
router.delete('/:id', validarJWT, deleteUser);



// EXPORT
module.exports = router;
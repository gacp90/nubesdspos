const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users.model');
const { generarJWT } = require('../helpers/jwt');

/** =====================================================================
 *  LOGIN
=========================================================================*/
const login = async(req, res = response) => {

    const { user, password } = req.body;

    try {

        // VALIDATE USER
        const userDB = await User.findOne({ user });
        if (!userDB) {

            return res.status(404).json({
                ok: false,
                msg: 'El usuario o la contraseña es incorrecta'
            });

        }
        // VALIDATE USER

        // PASSWORD
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña es incorrecta'
            });
        } else {

            if (userDB.status) {
                const token = await generarJWT(userDB.id);

                res.json({
                    ok: true,
                    token
                });
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: 'Tu cuenta a sido desactivada por un administrador'
                });
            }

        }

        // JWT - JWT

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }


};

/** =====================================================================
 *  RENEW TOKEN
======================================================================*/
const renewJWT = async(req, res = response) => {

    const uid = req.uid;

    // GENERAR TOKEN - JWT
    const token = await generarJWT(uid);

    // SEARCH USER
    const user = await User.findById(uid, 'user name role img address uid valid fecha status');
    // SEARCH USER

    if (user.status) {
        const token = await generarJWT(user._id);

        res.status(200).json({
            ok: true,
            token,
            user
        });
    } else {
        return res.status(401).json({
            ok: false,
            msg: 'Tu cuenta a sido desactivada por un administrador'
        });
    }
};


module.exports = {
    login,
    renewJWT
};
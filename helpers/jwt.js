/**
 * JWT
 */

const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {

    /* The code block you provided is creating a new Promise object. The Promise constructor takes a
    function as an argument, which is called the executor function. In this case, the executor
    function takes two parameters: `resolve` and `reject`, which are functions that are used to
    either fulfill or reject the promise. */
    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        /* The code `jwt.sign(payload, process.env.SECRET_SEED_JWT, { expiresIn: '4h' }, (err, token)
        => { ... })` is generating a JSON Web Token (JWT) using the `jsonwebtoken` library. excelent*/
        jwt.sign(payload, process.env.SECRET_SEED_JWT, {
            expiresIn: '15h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }

        });
    });

};

module.exports = {
    generarJWT
};
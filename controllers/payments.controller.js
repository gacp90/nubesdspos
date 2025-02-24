const { response } = require('express');

const Payment = require('../models/payments.model');
const Nube = require('../models/nubes.model');

/** ======================================================================
 *  GET
=========================================================================*/
const getPayments = async(req, res) => {

    try {

        const { desde, hasta, sort, ...query } = req.body;

        const [payments, total] = await Promise.all([
            Payment.find(query)
            .populate('user')
            .populate('nube')
            .skip(desde)
            .limit(hasta)
            .sort(sort),
            Payment.countDocuments()
        ]);

        res.json({
            ok: true,
            payments,
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
 *  CREATE
=========================================================================*/
const createPayment = async(req, res = response) => {

    try {

        let payment = new Payment(req.body);    

        const nube = await Nube.findById(payment.nube);
        if (!nube) {
            return res.status(404).json({ 
                msg: "No se encontro ninguna nube con este ID", 
                ok: false
            });
        }

        // SAVE USER
        await payment.save();

        // Obtener la fecha de vencimiento actual del cliente
        let fechaVencimiento = new Date(nube.vence);

        // Obtener la fecha de hoy
        let hoy = new Date();

        // Si la fecha de vencimiento ya expiró, tomar el próximo 1ero de mes
        if (fechaVencimiento < hoy) {
            fechaVencimiento = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
        }

        // Sumar los meses pagados, siempre fijando el día 1
        fechaVencimiento.setMonth(fechaVencimiento.getMonth() + payment.meses);
        fechaVencimiento.setDate(1); // Asegurar que sea el día 1

        // Guardar la nueva fecha de vencimiento en el cliente
        nube.vence = fechaVencimiento;
        await nube.save();

        let paymentDB = Payment.findById(payment._id)
            .populate('user')
            .populate('nube');

        
        res.json({
            ok: true,
            payment: paymentDB,
            vence: fechaVencimiento
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
 *  UPDATE
=========================================================================*/
const updatePayment = async(req, res = response) => {

    const payid = req.params.id;

    try {

        // SEARCH USER
        const paymnetDB = await Client.findById(payid);
        if (!paymnetDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun cliente con este ID'
            });
        }
        // SEARCH USER

        // VALIDATE USER
        const {...campos } = req.body;

        // UPDATE
        const paymentUpdate = await Payment.findByIdAndUpdate(payid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            payment: paymentUpdate
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
    getPayments,
    createPayment,
    updatePayment
};
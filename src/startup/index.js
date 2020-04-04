/*
    Esta va a ser la clase que le va a dar inicio a nuestra applicación
*/

const express = require('express')

// Esto se hace para que sean privados, para que sean solamente legibles en esta clase
let _express = null
let _config = null

class Server {
    /* 
        Aquí necesitamos nuestro router y la configuración. 
        Tienen que tener exactamente el mismo nombre que se uso en la config
    */
    constructor({ config, router }) {
        _config = config
        _express = express().use(router)
    }

    /*
        Este método va a retornar una promesa que va a ser
        la encargada de inicializar nuestro server
    */
    start() {
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => {
                console.log(_config.APPLICATION_NAME + " running on port " + _config.PORT)
                resolve()
            })
        })
    }
}

module.exports = Server

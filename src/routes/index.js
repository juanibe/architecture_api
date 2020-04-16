/*
    Este archivo va a ser nuestro router principal, va a ser el encargado
    de inyectar los middlewares que queramos, encargado de hacer las configuraciones de
    todas las rutas.
*/

const express = require('express')

const cors = require('cors')

// Middleware que nos ayuda con algunas brechas de seguridad que por defecto vienen
const helmet = require('helmet')

// Ayuda a comprimir las peticiones http para que sean mas rápidas
const compression = require('compression')

// Ayuda a capturar en un middleware las excepciones asíncronas que producen las promesas normalmente
require('express-async-errors');

const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares')

module.exports = function ({ HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes }) {
    const router = express.Router()
    const apiRoutes = express.Router()

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())

    apiRoutes.use("/home", HomeRoutes)
    apiRoutes.use("/user", UserRoutes)
    apiRoutes.use("/idea", IdeaRoutes)
    apiRoutes.use("/comment", CommentRoutes)
    apiRoutes.use("/auth", AuthRoutes)



    router.use("/v1/api", apiRoutes)

    router.use(NotFoundMiddleware)
    router.use(ErrorMiddleware)

    return router
}

/*
    Luego de esto, hay que ir al container y configurar este nuevo enrutador que hemos configurado
    para que se pueda inyectar.
*/
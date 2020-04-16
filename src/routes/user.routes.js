const { Router } = require('express')
const { AuthMiddleware, ParseIntMiddleware, CacheMiddleware } = require('../middlewares')
const { CACHE_TIME } = require('../helpers/cahce-time.helper')

/*
    Esto vendría siendo como un constructor de una clase, porque al fin y al cabo las clases 
    son funciones y esto es una clase pero sin la sintactic sugar de la palabra reservada clase
    Por lo tanto como funciona como el constructor de una clase, vamos a requerir el HomeController. Esto
    awilix ya lo tiene configurado, entonces cuando lo vea se lo va a proveer
*/
module.exports = function ({ UserController }) {
    const router = Router()

    /* 
        No lo invocamos, le pasamos la función y express se encarga de ejecutarlo.
        Cuando express hace esto, el scope es el de express, pero como en el container ya le pusimos un bind entonces
        el scope se va a mantener y vamos a poder acceder a nuestro servicio.
    */
    router.get("/:userId", [AuthMiddleware, ParseIntMiddleware, CacheMiddleware(CACHE_TIME)], UserController.get)
    router.get("/", UserController.getAll)
    router.patch("/:userId", UserController.update)
    router.delete("/:userId", UserController.delete)

    return router
}

/*
    Una vez preparado, vamos a nuestro container y preparamos esa ruta
*/
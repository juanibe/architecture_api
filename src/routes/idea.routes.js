const { Router } = require('express')
const { ParseIntMiddleware } = require('../middlewares')

/*
    Esto vendría siendo como un constructor de una clase, porque al fin y al cabo las clases 
    son funciones y esto es una clase pero sin la sintactic sugar de la palabra reservada clase
    Por lo tanto como funciona como el constructor de una clase, vamos a requerir el HomeController. Esto
    awilix ya lo tiene configurado, entonces cuando lo vea se lo va a proveer
*/
module.exports = function ({ IdeaController }) {
    const router = Router()

    /* 
        No lo invocamos, le pasamos la función y express se encarga de ejecutarlo.
        Cuando express hace esto, el scope es el de express, pero como en el container ya le pusimos un bind entonces
        el scope se va a mantener y vamos a poder acceder a nuestro servicio.
    */
    router.get("/", ParseIntMiddleware, IdeaController.getAll)
    router.get("/:ideaId", IdeaController.get)
    router.get("/:userId/all", IdeaController.getUserIdeas)
    router.post("/", IdeaController.create)
    router.patch("/:ideaId", IdeaController.update)
    router.delete("/:ideaId", IdeaController.delete)
    router.post("/:ideaId/upvote", IdeaController.upvoteIdea)
    router.post("/:ideaId/downvote", IdeaController.downvoteIdea)


    return router
}

/*
    Una vez preparado, vamos a nuestro container y preparamos esa ruta
*/
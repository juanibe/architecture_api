/*
    Aquí vamos a configuarar nuestro contenedor de inyección de dependencias
*/


/**
 * Metodos: 
 * asValue ==> método que nos va a ayudar a inyectar un objecto como un valor
 * asClass ==> método que nos va a ayudar a inyectar un objecto como una clase
 * asFunction ==> método que nos va a ayudar a inyectar un objecto como una función
 */
const { createContainer, asClass, asValue, asFunction } = require('awilix')

// Config
const config = require('../config')
const app = require('.')

// Services
const { HomeService, UserService, IdeaService, CommentService } = require('../services')

// Controllers
const { HomeController, UserController, IdeaController, CommentController } = require('../controllers')

// Routes
const { HomeRoutes } = require('../routes/index.routes')
const Routes = require('../routes')

// Models
const { User, Comment, Idea } = require('../models')

// Repositories
const { UserRepository, IdeaRepository, CommentRepository } = require('../repositories')


/*
    Este objeto tiene médotos. Uno de ellos es register para crear una nueva clase de inyección, un nuevo
    tipo de inyección.
*/
const container = createContainer()

/*
    Le paso un objecto a register como parametro, el key (HomeService) es como vamos a identificar a la inyección.
    Y luego lo que va a inyectar. En este caso va a ser una clase. La clase va a ser HomeService (importado mas arriba)
    y esa clase va a ser un singleton -> de forma que sea siempre la misma instancia de esta clase compartida entre las diferentes partes en que estemos usandola
*/
container
    // Configuración principal de la aplicación
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    // Configuración de los servicios
    .register({
        /*
            Singleton --> Para que sea siempre la misma instancia de esa clase compartida entre las 
            diferentes partes que utilicemos en dicha inyección.
        */
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton(),
        IdeaService: asClass(IdeaService).singleton(),
        CommentService: asClass(CommentService).singleton()
    })
    // Configuración de los controladores
    .register({
        /* Llamamos al metodo bind, porque express a la hora de llamar un controlador, el scope cambia. Con esto 
        el scope se mantiene
        */
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
        CommentController: asClass(CommentController.bind(CommentController)).singleton(),
    })
    //Configuración de las rutas
    .register({
        /*
            Con esto ya tenemos nuestras rutas configuradas y listas para ser inyectadas en los constructures
            de las diferentes funciones que los requirean
        */
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })
    .register({
        User: asValue(User),
        Comment: asValue(Comment),
        Idea: asValue(Idea)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        CommentRepository: asClass(CommentRepository).singleton(),
        IdeaRepository: asClass(IdeaRepository).singleton()
    })

module.exports = container
/*
    Aquí vamos a configuarar nuestro contenedor de inyección de dependencias
*/

const { createContainer, asClass, asValue, asFunction } = require('awilix')

// Config
const config = require('../config')
const app = require('.')

// Services
const { HomeService } = require('../services')

// Controllers
const { HomeController } = require('../controllers')

// Routes
const { HomeRoutes } = require('../routes/index.routes')
const Routes = require('../routes')


/*
    Este objeto tiene médotos. Uno de ellos es register para crear una nueva clase de inyección, un nuevo
    tipo de inyección.
*/
const container = createContainer()

/*
    Le paso un objecto a register como parametro, el key (HomeService) es como vamos a identificar a la inyección.
    Y luego lo que va a inyectar. En este caso va a ser una clase. La clase va a ser HomeService (importado mas arriba)
    y esa clase va a ser un singleton 
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
        HomeService: asClass(HomeService).singleton()
    })
    // Configuración de los controladores
    .register({
        /* Llamamos al metodo bind, porque express a la hora de llamar un controlador, el scope cambia. Con esto 
        el scope se mantiene
        */
        HomeController: asClass(HomeController.bind(HomeController))
    })
    //Configuración de las rutas
    .register({
        /*
            Con esto ya tenemos nuestras rutas configuradas y listas para ser inyectadas en los constructures
            de las diferentes funciones que los requirean
        */
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })

module.exports = container
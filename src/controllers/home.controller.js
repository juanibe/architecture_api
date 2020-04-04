let _homeService = null

/*
    Esta clase no va a necesitar nada ya que awilix le va a inyectar lo que ella necesita
*/

class HomeController {

    /*
        Este constructor va a destructurar un home service. 
        Este "HomeService", inyectado, es inyectado por awilix. Al momento de servirnos un objecto
        de este tipo de HomeController, va a ver que tiene una dependencia que es el HomeService y el se la va a 
        inyectar. Cabe destacar que el nombre (HomeService) debe coincidir con el nombre en el container de la carpeta
        startup
    */
    constructor({ HomeService }) {
        /*
            Vamos a inicializar la variable _homeService y le vamos a decir que equivale a 
            HomeService que viene por inyección de dependencia.
            No utilizo "this", porque eso significa que HomeService va a ser una propiedad de esa clase (HomeController)
            y el servicio no debe ser compartido. Entonces de esta manera nos aseguramos que HomeService sea de tipo
            privado
        */
        _homeService = HomeService
    }

    // req y res, express se encarga de pasarlos
    index(req, res) {
        return res.send(_homeService.index())
    }
}

module.exports = HomeController

/*
    Una vez que el controller esta preparado hay que inyectar, o sea configurar nuestro controller para
    que esté disponible para la inyección de dependencia. Esto se hace en awilix y configurarlo.
*/
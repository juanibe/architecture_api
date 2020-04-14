/*
    A este repositorio hay que heredarle el base repository
*/

const BaseRepository = require('./base.repository')
/*
    Esto es para que la variable sea privada.
*/
let _user = null;

class UserRepository extends BaseRepository {

    /*
        Como el constructor de la clase BaseRepository de la cual está hereando
        recibe un parámetro, entonces en el constructor de la clase hija tenemos que pasarle
        ese parámetro. Eso se hace con super.
    */
    constructor({ User }) {
        super(User)
        /*
            Esto es por si hay algun método adicional que esté fuera del CRUD que nos brinda
            BaseRepsitory, podamos tener accesso a nuestra entidad. Si la variable la inicio aquí entonces
            va a pertenecer a la clase de la cual estoy heredando, y si quiero utilizar para otro método no voy a poder.
        */
        _user = User
    }

    async getUserByUsername(username) {
        return await _user.findOne({ username })
    }
}

module.exports = UserRepository
const BaseRepository = require('./base.repository')
let _user = null;

class UserRepository extends BaseRepository {
    constructor({ User }) {
        super(User)
        /*
            Esto es por si hay algun método adicional que esté fuera del CRUD que nos brinda
            BaseRepsitory, podamos tener accesso a nuestra entidad.
        */
        _user = User
    }

    async getUserByUsername(username) {
        return await _user.findOne({ username })
    }
}

module.exports = UserRepository
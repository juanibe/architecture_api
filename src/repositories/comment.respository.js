const BaseRepository = require('./base.repository')
let _comment = null;

class CommentRepository extends BaseRepository {
    constructor({ Comment }) {
        super(Comment)
        /*
            Esto es por si hay algun método adicional que esté fuera del CRUD que nos brinda
            BaseRepsitory, podamos tener accesso a nuestra entidad.
        */
        _comment = Comment
    }
}

module.exports = CommentRepository
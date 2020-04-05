const BaseRepository = require('./base.repository')
let _idea = null;

class IdeaRepository extends BaseRepository {
    constructor({ Idea }) {
        super(Idea)
        /*
            Esto es por si hay algun método adicional que esté fuera del CRUD que nos brinda
            BaseRepsitory, podamos tener accesso a nuestra entidad.
        */
        _idea = Idea
    }

    async getUserIdea(author) {
        return await _idea.find({ author })
    }
}

module.exports = IdeaRepository
/*
    Este repositorio va a servir de plantilla para un CRUD cuya responsabilidad va 
    a ser heredada por otros repositorios.
*/

class BaseRepository {

    /*
        Este constructor va a recibir el modelo o la entidad de mongo db con la que va a interactuar.
    */
    constructor(model) {
        this.model = model
    }

    async get(id) {
        return await this.model.findById(id)
    }

    async getAll() {
        return await this.model.find()
    }

    async create(entity) {
        return await this.model.create(entity)
    }

    async update(id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true })
    }

    async delete(id) {
        await this.model.findByIdAndDelete(id)
        return true
    }
}

module.exports = BaseRepository
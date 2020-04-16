class BaseService {
    constructor(repository) {
        this.repository = repository
    }

    async get(id) {
        /*
            Nosotros ya hemos creado un middleware que captura los errores. 
            Aca se los manda. Ese middleware atrapa ese error
        */
        if (!id) {
            const error = new Error()
            error.status = 400
            error.message = 'id must be sent'
            throw error
        }

        const currentEntity = await this.repository.get(id)

        if (!currentEntity) {
            const error = new Error()
            error.status = 400
            error.message = 'entity not found'
            throw error
        }
    }

    async getAll(pageSize, pageNum) {
        return await this.repository.getAll(pageSize, pageNum)
    }

    async create(entity) {
        return await this.repository.create(entity)
    }

    async update(id, entity) {
        if (!id) {
            const error = new Error()
            error.status = 400
            error.message = 'id must be sent'
            throw error
        }

        return await this.repository.update(id, entity)
    }

    async delete(id) {
        if (!id) {
            const error = new Error()
            error.status = 400
            error.message = 'id must be sent'
            throw error
        }

        return await this.repository.delete(id)
    }
}

module.exports = BaseService
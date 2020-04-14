/*
    Esta clase por inyección de dependencia va a recibir nuestro servicio de idea
*/

let _ideaService = null

class IdeaController {
    constructor({ IdeaService }) {
        _ideaService = IdeaService
    }

    /*
        Acá estoy recibiendo un request y un response, que eso se lo va a pasar
        express al momento de hacer el request. Ambos son objectos
    */
    async get(req, res) {
        const { ideaId } = req.params
        const idea = await _ideaService.get(ideaId)
        return res.send(idea)
    }

    async getAll(req, res) {
        const ideas = await _ideaService.getAll()

        return res.send(ideas)
    }

    async create(req, res) {
        const { body } = req;
        const createdIdea = await _ideaService.create(body)
        return res.status(201).send(createdIdea)
    }

    async update(req, res) {
        const { body } = req;
        const { ideaId } = req.params;
        const updatedIdea = _ideaService.update(ideaId, body)
        return res.send(updatedIdea)

    }

    async delete(req, res) {
        const { ideaId } = req.params;
        const deletedIdea = _ideaService.delete(ideaId)
        return res.send(deletedIdea)
    }

    async getUserIdeas() {
        const { userId } = req.params;
        const ideas = _ideaService.getUserIdeas(userId)
        res.send(ideas)
    }

    async upvoteIdea(req, res) {
        const { ideaId } = req.params;
        const idea = await _ideaService.upvoteIdea(ideaId)
        res.send(idea)
    }

    async downvoteIdea(req, res) {
        const { ideaId } = req.params;
        const idea = await _ideaService.downvoteIdea(ideaId)
        res.send(idea)
    }

}

module.exports = IdeaController;
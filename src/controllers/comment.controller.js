/*
    Esta clase por inyección de dependencia va a recibir nuestro servicio de user
*/

let _commentService = null

class CommentController {
    constructor({ CommentService }) {
        _commentService = CommentService
    }

    /*
        Acá estoy recibiendo un request y un response, que eso se lo va a pasar
        express al momento de hacer el request. Ambos son objectos
    */
    async get(req, res) {
        const { commentId } = req.params
        const comment = await _commentService.get(commentId)
        return res.send(comment)
    }

    async getAll(req, res) {
        const comments = await _commentService.getAll()
        return res.send(comments)
    }

    async update(req, res) {
        const { body } = req;
        const { commentId } = req.params;
        const updatedComment = _commentService.update(commentId, body)
        return res.send(updatedComment)

    }

    async delete(req, res) {
        const { commentId } = req.params;
        const deletedComment = _commentService.delete(commentId)
        return res.send(deletedComment)
    }

    async getIdeaComments(req, res) {
        const { ideaId } = req.params;
        const comments = await _commentService.getIdeaComments(ideaId)
        return res.send(comments)
    }

    async createComment(req, res) {
        const { body } = req;
        const { ideaId } = req.params
        const comments = await _commentService.createComment(body, ideaId)
        return res.status(201).send(comments)
    }

}

module.exports = CommentController;
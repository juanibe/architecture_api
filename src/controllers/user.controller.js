/*
    Esta clase por inyección de dependencia va a recibir nuestro servicio de user
*/

let _userService = null

class UserController {
    constructor({ UserService }) {
        _userService = UserService
    }

    /*
        Acá estoy recibiendo un request y un response, que eso se lo va a pasar
        express al momento de hacer el request. Ambos son objectos
    */
    async get(req, res) {
        const { userId } = req.params
        const user = await _userService.get(userId)
        return res.send(user)
    }

    async getAll(req, res) {
        const { pageSize, pageNum } = req.query
        const users = await _userService.getAll(pageSize, pageNum)

        res.send(users)
    }

    async update(req, res) {
        const { body } = req;
        const { userId } = req.params;
        const updatedUser = _userService.update(userId, body)
        return res.send(updatedUser)

    }

    async delete(req, res) {
        const { userId } = req.params;
        const deletedUser = _userService.delete(userId)
        res.send(deletedUser)
    }

}

module.exports = UserController;
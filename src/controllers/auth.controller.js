let _authService = null

class AuthController {
    constructor({ AuthService }) {
        _authService = AuthService
    }

    async signUp(req, res) {
        const { body } = req;
        const createdUser = await _authService.signUn(body)
        res.status(201).send(createdUser)
    }

    async signIn(req, res) {
        const { body } = req;
        const creds = await _authService.signIn(body)
        res.status(200).send(createdUser)
    }
}

module.exports = AuthController;
const JWT = require('jsonwebtoken');
const User = require("../modals/user")
const auth = async (req, res, next) => {
    try {

        const token = req.header("Authorization").split(" ")[1]

        const decodeToken = JWT.verify(token, "deepak")

        if (decodeToken) {
            await User.findByPk(decodeToken.userId).then((user) => {
                req.user = user,
                    next()
            })
        }

    } catch (err) {
        return res.status(401).json(err)
    }
}
module.exports = auth;
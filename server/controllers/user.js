
const User = require('../modals/user')
const JWT = require("jsonwebtoken");
function Token(id) {
    return JWT.sign({ userId: id }, "deepak", { expiresIn: "1d" })
}
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password })
        return res.status(201).json({ success: true, msg: "user created sucessfully" })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const user = await User.findAll({ where: { email } })

        if (user) {
            console.log("----------login--------------")
            if (user[0].password === password) {
                return res.status(200).json({ message: "login success", success: true, user: user[0], token: Token(user[0].id) })
            }
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { name, email, lastName, password, location } = req.body;
        const user = await User.findOne({ where: req.user.id })
        const updatedUser = await user.update({ name, email, lastName, password, location })
        res.status(201).json({
            success: true,
            message: "Update user successfuly",
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}


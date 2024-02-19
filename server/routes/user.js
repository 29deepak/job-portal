const express = require('express')

const router = express.Router()
const userController = require("../controllers/user");
const auth = require('../middlewares/auth');
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100,
    standardHeaders: true,
    leagcyHeaders: false

})

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - lastName
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user collection
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         location:
 *           type: string
 *           description: The location of the user
 *       example:
 *         id: "457r-6783-4783-234784"
 *         name: "test"
 *         lastName: "test"
 *         email: "d@gmail.com"
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to users
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Successfully created a new user.
 *       '400':
 *         description: Bad request. Check request payload.
 */
router.post('/register', limiter, userController.register);

router.post('/login', limiter, userController.login)

router.put("/update-user", auth, userController.updateUser)
module.exports = router;
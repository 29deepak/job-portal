//api documentation

const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("swagger-jsdoc")


const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sequelize = require("./utils/database")

const User = require('./modals/user')
const Jobs = require('./modals/jobs')
const userRoutes = require('./routes/user')

// swagger api config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Jpb Portal Application",
            description: "Node exprees js job portal application"

        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis: ['./routes/*.js'],
}

const spec = swaggerDoc(options)



const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(userRoutes)
// home route 
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

app.use(User)
app.use(Jobs)

Jobs.belongsTo(User, { foreignKey: "createdBy" })




const server = http.createServer(app).listen(4000)
sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        server
        console.log("connected successfully")

    }).catch((err) => {
        console.log(err)
    })
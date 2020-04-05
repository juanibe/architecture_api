const container = require('./src/startup/container')

const server = container.resolve("app")

const { MONGO_URI } = container.resolve("config")

const mongoose = require('mongoose')

mongoose.set("useCreateIndex", true)

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        server.start()
    })
    /* 
        Aquí no ejecutamos el console.log, ya que el catch se va a encargar de pasarle el error, y el console log se
        va a ejecutar
    */
    .catch(console.log)
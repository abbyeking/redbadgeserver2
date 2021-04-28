require('dotenv').config()
const Express = require('express')
const app = Express()
const db = require('./db')

app.use(Express.json())
const headers = require("./middleware/headers")
console.log(headers)
app.use(headers)
const controllers = require('./controllers/index')

// app.use(Express.json())

// controllers
app.use('/user', controllers.User)

app.use(require("./middleware/validate-jwt")) 
app.use('/podcast', controllers.Podcast)
app.use('/notes', controllers.Notes)

db.authenticate()
    .then(() => db.sync())
    // .then(() => db.sync({force: true}))
    .then(() => {
        // app.listen(process.env.PORT, console.log(`[server]: listening on localhost:${process.env.PORT}`))
        app.listen(3000,function (){
          console.log('App is listening on port 3000')
        })
    })
    .catch(err => {
        console.log('[server]: Server Crashed')
        console.log(err)
    })
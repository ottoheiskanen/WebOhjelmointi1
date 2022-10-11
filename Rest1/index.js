const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const hbs = require('hbs')

const router = require('./router.js')
app.use(express.text())
// app.use(express.json())
app.use(router)

const publicDirPath = path.join(__dirname, './public')

app.set('view engine', 'hbs')
app.set('views', publicDirPath)
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Sanakirja',
        content: null
    })
})

app.listen(port, () => {
    console.log('Server up on port ' + port)
})
const express = require('express')
const path = require('path')
const fs = require('fs')
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;
const app = express()

// express static 
app.use(express.static(path.join(__dirname, 'public')))
    // set viewies 
app.set('views', path.join(__dirname, 'views'))
    // call ejs on views
app.set('view engine', 'ejs')

// ROUTES
app.get('/', (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
    res.render('pages/index', { data: data })
})


// APP listening server on port 5000
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
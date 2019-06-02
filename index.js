const express = require('express')
const path = require('path')
const fs = require('fs')
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;
const app = express()

// urlecoded 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    // express static 
app.use(express.static(path.join(__dirname, 'public')))
    // set viewies 
app.set('views', path.join(__dirname, 'views'))
    // call ejs on views
app.set('view engine', 'ejs')

// ROUTES
// index page
app.get('/', (req, res) => {
        let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
        res.render('pages/index', { data: data })
    })
    // get new post page 
app.get('/newpost', (req, res) => {
    res.render('pages/newpost')
})

// post new post

app.post('/newpost', urlencodedParser, (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
    let postId;
    if (data.blogs.length == 0) {
        postId = 1
    } else {
        postId = data.blogs[data.blogs.length - 1].id + 1
    }
    let newPost = {
        id: postId,
        title: req.body.title,
        body: req.body.body,
        intro: req.body.intro,
        time: new Date
    }
    data.blogs.push(newPost);
    fs.writeFile(__dirname + '/app.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.redirect('/')
})

// blogs 

app.get('/blogs/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
    let postId = req.params.id;
    let blog;
    for (let i = 0; i < data.blogs.length; i++) {
        if (data.blogs[i].id == postId) {
            blog = (data.blogs[i])
        }
    }
    res.render('pages/blog', { data: data, blog: blog })
})


// APP listening server on port 5000
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
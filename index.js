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

// delete
app.get('/delete/:id', function(req, res) {
    let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
    let postId = req.params.id;
    let blogdata = data.blogs.filter(blog => blog.id != postId)
    data.blogs = blogdata
    fs.writeFile(__dirname + '/app.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.redirect('/')
})

// GET EDIT
app.get('/edit/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
    let postId = req.params.id;
    let blog;
    for (let i = 0; i < data.blogs.length; i++) {
        if (data.blogs[i].id == postId) {
            blog = (data.blogs[i])
        }
    }
    res.render('pages/edit', { data: data, blog: blog })
})

//  POST EDIT BLOG
app.post('/edit/:id', urlencodedParser, (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
    let postId = req.params.id
    let newPost = {
        id: postId,
        title: req.body.title,
        body: req.body.body,
        intro: req.body.intro,
        time: new Date
    }
    for (let i = 0; i < data.blogs.length; i++) {
        if (data.blogs[i].id == postId) {
            data.blogs[i] = newPost
        }
    }
    fs.writeFile(__dirname + '/app.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.redirect('/')
})


// GET PROFILE
app.get('/profile', (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
    res.render('pages/profile', { data: data })
})

//  POST EDIT PROFILE
app.post('/profile', urlencodedParser, (req, res) => {
    let data = JSON.parse(fs.readFileSync(__dirname + '/app.json', 'utf8'))
    console.log(data)
    data.firstName = req.body.firstName
    data.lastName = req.body.lastName
    data.bio = req.body.bio

    console.log(req.body)
    fs.writeFile(__dirname + '/app.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.redirect('/')
})

// 404
app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!")
})


function startKeepAlive() {
    setInterval(function() {
        var options = {
            host: 'https://heroku-blog-better-than-medium.herokuapp.com/',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 12 * 3600 * 1000);
}

startKeepAlive();

// APP listening server on port 5000
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});


// app.post('/events', (req, res) => {
//     const {type, data} = req.body;
//     console.log(req.body);
//     // if (type === 'postCreated') {
//     //     const {id, title} = data;
//     //     posts[id] = {
//     //         id, title, comments: []
//     //     }
//     //     console.log(posts);
//     //
//     // }
//     // if (type === 'commentCreated') {
//     //
//     // }
//     // res.send('<h1>heys</h1>');
// });

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    if (type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
        console.log(posts);
    }
    if (type === 'commentCreated') {
        console.log(data);
        const {id, content, postId} = data;
        const post = posts[postId];
        post.comments.push({id, content})
    }
    res.send({});

});

app.listen('7002', () => {
    console.log('this is query service')
})



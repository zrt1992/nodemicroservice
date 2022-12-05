const express = require('express')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

const handleEvent = (type, data) => {
    if (type === 'postCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
        console.log(posts);
    }
    if (type === 'commentCreated') {
        console.log(data);
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id, content, status})
    }
    if (type === "commentUpdated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        console.log(post);
        const comment = post.comments.find((comment) => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
}

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    console.log('Event created:',type);
    handleEvent(type,data);
    res.send({});

});

app.listen('7002', async  () => {
    console.log('this is query service');
    const res = await axios.get('http://eventbus:7002/events') ;
    for(let event of res.data){
        console.log('Processing event:', event.type);
        handleEvent(event.type, event.data);
    }
})



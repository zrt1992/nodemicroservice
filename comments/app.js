const express = require('express')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content, status: 'pending'});
    commentsByPostId[req.params.id] = comments;
    await axios.post('http://event-bus-srv:7002/events', {
        type: 'commentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    console.log('Recieved Event', req.body.type);
    const {type, data} = req.body;
    console.log("what is data");
    console.log(data);
    if (type === "commentModerated") {
        const {id, postId, status, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id
        });
        comment.status = status;
        console.log('come here');
        await axios.post('http://event-bus-srv:4000/events', {
            type: 'commentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
});

app.listen('7002', () => {
    console.log('listen to posts');
});
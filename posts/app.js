const express = require('express')
const app = express()
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    };
    await axios.post('http://eventbus:7002/events', {
        type: 'postCreated',
        data: {
            id, title
        }
    }); //8000 is event broker port
    res.status(201).send(posts[id]);
})

app.post('/events', (req, res) => {
    const {type,data} =req.body;
    console.log(type,data);
});

app.listen('7002', () => {
    console.log('listen to posts');
});
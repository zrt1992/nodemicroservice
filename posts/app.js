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

app.post('/posts/create',  async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    };
   // console.log('kubernetes');
    await axios.post('http://event-bus-srv:4000/events', {
        type: 'postCreated',
        data: {
            id, title
        }
    }).catch((error) => {
        console.log(error);
    });
    res.status(201).send(posts[id]);
})

// app.post('/events', (req, res) => {
//     const {type,data} =req.body;
//     console.log('back to posts');
//     res.status(201).send(posts);
// });
app.post("/events", (req, res) => {
    console.log("Received Event", req.body.type);

    res.send({});
});
app.listen('7002', () => {
    console.log('listen to posts');
});
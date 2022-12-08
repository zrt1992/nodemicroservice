const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())
const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event);
    // let xyz = await axios.post('http://post-cluster-ip-srv:4000/events', event)

    await axios.post('http://posts-clusterip-srv:4000/events', event)
        .catch((error) => {
            console.log('error in post service');
        });

    await axios.post('http://query-srv:4000/events', event)
        .catch((error) => {
            console.log('error in query service');
        });

    await axios.post('http://moderation-srv:4000/events', event)
        .catch((error) => {
            console.log('error in moderation service');
        });
    await axios.post('http://comments-srv:4000/events', event)
        .catch((error) => {
            console.log('error in comments service');
        });
    console.log('event service called');
    res.status(201).send('hey');


   res.send({status: 'ok'});
});

app.get('/events', (req, res) => {
    res.send(events);
});
app.listen('7002', () => {
    console.log('this is event bus on 8000');
})



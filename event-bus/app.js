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
    await axios.post('http://query:7002/events', event)
        .catch((error) => {
            console.log(events);
        })
    await axios.post('http://posts:7002/events', event)
        .catch((error) => {
            console.log(events);
        });

    await axios.post('http://moderation:7002/events', event)
        .catch((error) => {
            console.log(events);
        });
    await axios.post('http://comments:7002/events', event)
        .catch((error) => {
            console.log(events);
        });
    console.log(event);


    res.send({status: 'ok'});
});

app.get('/events', (req, res) => {
    res.send(events);
});
app.listen('7002', () => {
    console.log('this is event bus on 8000');
})



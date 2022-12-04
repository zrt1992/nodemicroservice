const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.post('/events', async (req, res) => {
    const event = req.body;
    // console.log(event);
    // axios.post('http://posts:7002/events',event);
    // axios.post('http://comments:7002/events',event);
    axios.post('http://posts:7002/events',event);
    axios.post('http://query:7002/events',event);
    res.send({status:'ok'});
});

app.get('/events', (req, res) => {

    res.send({status: 'ok'});


})
app.listen('7002', () => {
    console.log('this is event bus on 8000');
})



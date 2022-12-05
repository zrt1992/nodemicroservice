const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const {type, data} = req.body
    if (type === "commentCreated") {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        console.log(status);
        await axios.post('http://eventbus:7002/events', {
            type: 'commentModerated',
            data : {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
        // console.log(req.body);
        res.send({});
    }
})


app.listen('7002', () => {
    console.log('This is moderation service');
});
// CREATE SERVER

const express = require('express');

const app = express();

// ESTABLISH ROUTES
app.get('/',(req, res) => {
    res.send(`Hello from Express!`);
});

app.post('/users', (req, res) => {

})


app.post('/users/:firstName/:lastName', (req, res) => {
    console.log(req.params.firstName);   // John
    console.log(req.params.lastName);    // Adams

    // res.send(`Hello`)
})


// SET PORT AND LISTEN TO INCOMING TRAFFIC
const port = 3000;

app.listen(port, () => console.log(`listening to port ${port}...`));

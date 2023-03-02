import express from 'express';

const port = 8000;
const app = express();

app.all('/hello', (req, res, next) => {
    console.log('All');
    next();
});

app.get('/hello', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

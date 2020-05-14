const express = require('express');
const axios = require('axios');


const app = express();
const port = 3333;

const CART = 'http://localhost:3001/';
const REVIEWS = 'http://localhost:3002/';
const CAROUSEL = 'http://localhost:3003/';
const DETAILS = 'http://localhost:3004/';
const RECOMMENDED = 'http://localhost:3005/';

app.use('/games/:gameId', express.static('public'));
app.use(express.json());


// app.get('/carousel/:gameId', (req, res) => {
//   axios.get('/carousel/:gameId', {
//     baseURL: 'http://localhost:3003/'
//   })
//     .then((data) => { console.log(data), res.status(200).send(data.data); })
//     .catch(() => { res.status(404).end(); });
// });

// app.get('/recommended', (req, res) => {
//   axios.get('/recommended', {
//     baseURL: 'http://localhost:3005/',
//   })
//     .then((data) => { res.status(200).send(data.data); })
//     .catch(() => { res.status(404).end(); });
// });

// app.get('/reviews/:gameId', (req, res) => {
//   axios.get({
//     baseURL: `http://localhost:3002/reviews/${req.params.gameId}`
//   })
//     .then((data) => { res.status(200).send(data.data); })
//     .catch(() => { res.status(404).end(); });
// });

// app.get('/cartapi/:gameId', (req, res) => {
//   axios.get({
//     baseURL: `http://localhost:3001/cartapi/${req.params.gameId}`
//   })
//     .then((data) => { res.status(200).send(data.data); })
//     .catch(() => { res.status(404).end(); });
// });

// app.get('/api/games/:gameId', (req, res) => {
//   axios.get({
//     baseURL: `http://localhost:3004/api/games/${req.params.gameId}`
//   })
//     .then((data) => { res.status(200).send(data.data); })
//     .catch(() => { res.status(404).end(); });
// });


app.all('/carousel/:gameId', (req, res) => {
  axios.get({
    url: `${CAROUSEL}carousel/${req.params.gameId}`,
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong!');
    });
});

app.all('/cartapi/:gameId', (req, res) => {
  axios.get({
    url: `${CART}cartapi/${req.params.gameId}`,
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong!');
    });
});

app.all('/api/games/:gameId', (req, res) => {
  axios.get({
    url: `${DETAILS}api/games/${req.params.gameId}`,
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong!');
    });
});

app.all('/recommended/', (req, res) => {
  axios.get({
    url: `${RECOMMENDED}recommended/`,
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong!');
    });
});

app.all('/reviews/:gameId', jsonParser, (req, res) => {
  const METHOD = req.method;
  const BODY = req.body;
  axios({
    method: METHOD,
    url: `${REVIEWS}reviews/${req.params.gameId}`,
    data: JSON.stringify(BODY),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong!');
    });
});


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

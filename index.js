const API_URL = '';

const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', cors(corsOptions), (req, res) => {
  const token = req.get('Authorization');
  request(
    { 
      url: `${API_URL}${req.url}`,
      headers: {
        'Authorization': token
        // 'Access-Control-Allow-Origin:': '*'
      },
    },
    (error, response, body) => {
      console.log(body);
      if (error || response.statusCode !== 200) {
        const message = error || ''
        return res.status(500).json({ type: 'error', message });
      }
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      const parsedRes = JSON.parse(body);
      console.log(parsedRes);
      res.send(parsedRes);
    }
  )
});

app.post('*', (req, res) => {
  const token = req.get('Authorization');
  request
  .post(
    { 
      url: `${API_URL}${req.url}`,
      headers: {
        'Authorization': token,
      },
      form: req.body
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        const message = error || ''
        return res.status(500).json({ type: 'error', message });
      }
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      const parsedRes = JSON.parse(body);
      console.log(parsedRes);
      res.send(parsedRes);
    }
  )
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

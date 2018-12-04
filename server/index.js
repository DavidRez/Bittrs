const express = require('express');
const app = express();
const port = 5050;
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

const pool = mariadb.createPool({host: 'localhost', user:'root', database: 'bitters', connectionLimit: 5});

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(__dirname + '/../client/dist'));

app.get('/herbs', (req, res) => {
    pool.getConnection()
    .then(conn => {
        conn.query('select * from bitters.herbs')
        .then(result => {
            res.status(200).send(result);
            conn.end();
        })
        .catch(() => {
            res.status(400).send('could not retrieve herbs');
            conn.end();
        });
    })
    .catch(() => {
        res.status(400).send('could not connect to bitters');
    });
});

app.get('/benefits', (req, res) => {
    pool.getConnection()
    .then(conn => {
        conn.query('select * from bitters.benefits')
        .then(result => {
            res.status(200).send(result);
            conn.end();
        })
        .catch(() => {
            res.status(400).send('could not retrieve benefits');
            conn.end();
        });
    })
    .catch(() => {
        res.status(400).send('could not connect to bitters');
    });
});

app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});

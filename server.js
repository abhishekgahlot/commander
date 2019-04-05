const express = require('express');
const low = require('lowdb');
const fs = require('fs');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path')

const app = express();
const port = 3000;

app.use(express.static('dist'));


app.use((req, res, next) => {

  // -----------------------------------------------------------------------
  // authentication middleware

  const auth = {login: 'abhishek', password: 'batman12345'} // change this

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

  // Verify login and password are set and correct
  if (!login || !password || login !== auth.login || password !== auth.password) {
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message
    return
  }

  // -----------------------------------------------------------------------
  // Access granted...
  next()
});


const Commander = require('./commander');

const adapter = new FileSync('processes/process.json')
const db = low(adapter)

db.defaults({ processes: []})
  .write();


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/run/:command', async function (req, res) {
  let command = req.params.command.toString();
  let response = await new Commander(command).startProcess();
  db.get('processes').push({ id: response, command }).write()
  res.send({ data: JSON.stringify(response) });
});

app.get('/getall', async function(req, res) {
  res.send({ data: db.get('processes') });
});

app.get('/get/:uuid', async function(req, res) {
  let uuid = req.params.uuid.toString();
  fs.readFile(`./processes/${uuid}`, 'utf8', function(err, contents) {
    res.send({ data: JSON.stringify(contents) });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
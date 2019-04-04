const express = require('express');
const low = require('lowdb');
const fs = require('fs');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const port = 3000;

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
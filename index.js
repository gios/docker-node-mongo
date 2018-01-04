'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost:27017';
const MONGO_URL = `mongodb://${MONGO_HOST}`;
const MONGO_DB_NAME = 'amigo';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello world from Dockers\n');
});

MongoClient.connect(MONGO_URL, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(MONGO_DB_NAME);

  insertDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  const collection = db.collection('documents');

  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);

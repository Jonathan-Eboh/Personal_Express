const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://void:voidcoderc23@cluster0.0fwy2nn.mongodb.net/todoDB?retryWrites=true&w=majority";
const dbName = "todoDB";

app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

//read
app.get('/', (req, res) => {
  db.collection('todolist').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { todolist: result })
  })
})



//update
app.put('/messages', (req, res) => {
  db.collection('todolist')
    .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
      $set: {
        thumbUp: req.body.thumbUp + 1
      }
    }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
})

//create
app.post('/todotask', (req, res) => {
  db.collection('todolist').insertOne({ task: req.body.task, priority: req.body.priority, completed: false }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


//change value of check
app.put('/completetask', (req, res) => {
  db.collection('todolist')
    .findOneAndUpdate({ task: req.body.task }, {
      $set: {
        // thumbUp: req.body.thumbUp + 1
        completed: true
      }
    }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
})

//delete

app.delete('/deletetask', (req, res) => {
  console.log(req.body);

  db.collection('todolist').findOneAndDelete({ task: req.body.task }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

//original delete
// app.delete('/messages', (req, res) => {
//   db.collection('todolist').findOneAndDelete({ name: req.body.name, msg: req.body.msg }, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Message deleted!')
//   })
// })

/*
app.delete('/deletetask', (req, res) => {
  db.collection('todolist').findOneAndDelete({ task: req.body.task, priority: req.body.priority, completed: false }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('task deleted!')
  })
})
*/
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const mongoose = require('mongoose');
app.use(bodyParser.json());
const User = require('./user');

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/users', {useUnifiedTopology: true,  useNewUrlParser: true });

app.post('/api/createUser', (request, res) => { 
      var chatRm = new User(request.body);
      chatRm.save((err, users) => {
        console.log(err);
        if (err){
          res.status(500).send(null);
        } else{
          console.log(users);
          res.send(users);
        }
      });
});
app.put('/api/updateUser', (request, ress) => {
    User.update({_id: request.body.id},
        {$set: request.body},
        { multi: true },
        function(err, res) {
          console.log(res)
            if(err){
            console.log(err);
            ress.status(500).send(err);
            }else{
            //do stuff
            ress.send(null);
            }
        }
    );
});

app.get('/api/users', (request, ress) => { 
    const roomss = User.find({}, (err, res) => {
        console.log(err);
        ress.status(200).send(res);
      });
});

app.delete('/api/delete/:id', (request, ress) => { 
    User.deleteOne({_id: request.params.id}, function(err, res){
        ress.send(res);
    });
});
app.listen(3000, function() {
    console.log('listening on 3000');
  })

// mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true}).then(client => {
//     console.log('Connected to Database')
//      const db = client.db('users')
//      // All your handlers here...
//         app.get('/', (req, res) => {/*...*/})
//         app.post('/quotes', (req, res) => {/*...*/})
//   });

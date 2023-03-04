const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();
console.log(process.env);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public'));
app.use(express.json());

const database = new Datastore('databae.db');
database.loadDatabase();

app.get('/get/:myparam', (req, res) => {
    const myparam = req.params.myparam;
    console.log(myparam)  
  
    res.json({
      status: 'success',
      data: myparam
    })
  });



// GET method route
app.get('/get', (req, res) => {
  console.log(req);
  database.find({}, (err, data) =>{
    if(err){
        res.end();
        return;
    }
    res.json({
      status: 'success',
      data: data
    })
  });

  //res.send('GET request to the homepage')
})

// POST method route
app.post('/api', (req, res) => {
  console.log(req.body);

  const data = { 'name': req.body.name, 'lastname': req.body.lastname}

  database.insert(data);
  
  //res.send('POST request to the homepage')
  //res.end();
  res.json({
    status: 'success',
    data: data
  })
})
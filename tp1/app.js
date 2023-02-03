const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const stream = require('stream')

/*Q9*/
var uptime = Math.round(process.uptime());
var list = {
  status: "healthy",
  requestsCount: {
    "/": 0,
    "/welcome": 0,
    "/secret": 0,
    "/redirectMe": 0,
    "/error": 0,
    "/img": 0,
    "/somme": 0,
    "/users": 0,
    "/metrics":0,
  },
  uptime: uptime,
};

app.use("/", function (req, res, next) {
  var requests = req.url.split('/');
  var request = `/${requests[1]}`;
  var ifsomme = request.split('?');

  if (ifsomme[0]=="somme"){
    request = `/${ifsomme[0]}`;
  }
  list['requestsCount'][request]++;
  next();
})

/*Q8*/
app.use("/", function (req, res, next) {
  var date = new Date().toISOString();
  var url = req.url;
  console.log(`[${date}] : ${url}`);
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

/*Q1*/
app.get('/welcome', (req, res) => {
  res.send('Bienvenue sur le TP 1 du cours d architecture logicielle')
})
/*Q2*/
app.get('/secret', (req, res) => {
  res.status(401).send('Vous ne possédez pas les droits pour accéder à ma page secrète')
  
})
/*Q3*/
app.get('/error', (req, res) => {
  res.status(500).json({name:"Bernard l'hermite"})
})
/*Q4*/
app.get('/img',(req, res) => {
  res.download('test.jpg') 
})
/*Q5*/
app.get('/redirectme', (req, res) => {
  res.redirect("https://www.iut-littoral.fr")
})
/*Q6*/
app.get('/users/:name', (req, res) => {
  res.send("Bienvenue sur la page de " + req.params.name)
})
/*Q7*/
app.get('/somme', (req, res) => {
  res.send("Somme = " + (parseInt(req.query.a) + parseInt(req.query.b)))
})
/*Q9*/
app.get('/metrics', (req, res) => {
  res.json(list)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
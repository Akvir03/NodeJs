const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const stream = require('stream')
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
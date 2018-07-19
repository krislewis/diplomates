const express = require('express')
const bodyParser = require('body-parser')

const store = require('./store')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.post('/createUser', (req, res) => {
    store
        .createUser({
            username: req.body.username,
            password: req.body.password
        })
        .then(() => res.sendStatus(200))
})
app.post("/EditDip", (req, res) => {
  store
    .EditDip({
      id: req.body.DipID,
      name: req.body.DipName,
      city: req.body.DipCity,
      state_prov: req.body.DipState,
      country: req.body.DipCountry,
      cert_number: req.body.DipCert,
      status: req.body.DipStatus
    })
    //.then(() => res.sendStatus(200));
    .then(() => {
        res.sendStatus(200);
        return "You made a change!";
    }, () => {return "mistake!"})
});
//app.get('/dips', (req, res) => { res.send(store.getAllDips(req, res))})
app.get('/dips', (req, res) => { store.getTheDips(req, res) })
app.get('/dip/:id', (req, res) => {store.getADip(req, res)})
app.get('/cert/:id', (req, res) => {store.getACert(req, res)})
app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})
const express = require('express')
const router = express.Router()
const VISTIORS_FILE = "visitors.json"
const HOSTS_FILE = "hosts.json"

var fs = require('fs')

router.get('/message/:name', (req, res) => {
  var obj = {
    name: "Kate",
    text: "There are not enough scooters in this room"
  }

  var newVisitor = { name: req.params.name }

  res.json(obj)

  var visitors = []

  fs.readFile(VISTIORS_FILE, 'utf8', function (err, data) {
    if (err) throw err

    if (data !== "") {
      visitors = JSON.parse(data)
    }

    visitors.push(newVisitor)

    fs.writeFile(VISTIORS_FILE, JSON.stringify(visitors), function (err) {
      if (err) throw err
      else console.log('Data saved to visitors file!')
    });

  });
})

router.get('/visitors', (req, res) => {
  fs.readFile(VISTIORS_FILE, 'utf8', function (err, data) {
    if (err) throw err
    res.json(data)
  });
})

router.get('/hosts', (req, res) => {
  fs.readFile(HOSTS_FILE, 'utf8', function (err, data) {
    if (err) throw err
    res.json(data)
  });
})

router.post('/write-to-hosts', (req, res) => {
  var newHost = { name: req.body.name, text: req.body.text }
  var hosts = []

  fs.readFile(HOSTS_FILE, 'utf8', function (err, data) {
    if (err) throw err

    if (data !== "") {
      hosts = JSON.parse(data)
    }

    hosts.push(newHost)

    fs.writeFile(HOSTS_FILE, JSON.stringify(hosts), function (err) {
      if (err) throw err
      else console.log('Data saved to hosts file!')
    });

  });
})

module.exports = router


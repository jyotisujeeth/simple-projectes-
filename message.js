const express = require('express');
const fs = require('fs');

const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
    res.send(
      '<form action="/" method="POST" onSubmit="document.getElementById(`username`).value=localStorage.getItem(`username`)"><input type="text" name="message" id="message"><input type="hidden" name="username" id="username"></input><button type="submit">Send</button></form>'
    );
  });

  router.post('/', (req, res, next) => {
    fs.writeFileSync('message.txt', `${req.body.username}:${req.body.message}`,{flag:'a'});
    console.log(req.body.username);
    console.log(req.body.message);
      res.redirect('/');
    });

module.exports = router;



const express = require('express');
const fs = require('fs');

const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            console.log(err);
        }
        res.send(
            `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')"><input type="text" name="message" id="message"><input type="hidden" name="username" id="username"></input><button type="submit">Send</button></form>`
          );
    })
    
  });

  router.post('/', (req, res, next) => {
    fs.writeFileSync('message.txt', `${req.body.username}:${req.body.message}`,{flag:'a'});
    console.log(req.body.username);
    console.log(req.body.message);
      res.redirect('/');
    });

module.exports = router;
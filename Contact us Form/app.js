const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/contact',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','contactUs.html'));
})
app.post('/contact',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/contact')
})

app.listen(4000);

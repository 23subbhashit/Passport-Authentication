const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

const passport = require('passport');

const intitializePassport = require('./passport-config');

intitializePassport(passport)


const users = [];

app.set( 'view-engine', 'ejs' );
app.use(express.urlencoded( { extended : false } ))

app.get('/' , ( req , res) => {
    res.render('index.ejs' , { name : "Subbhashit" });
})
app.get('/login' , ( req , res ) => {
    res.render('login.ejs');
})
app.get('/register' , ( req , res ) => {
    res.render('register.ejs');
})

app.post('/register' , async ( req , res ) => {
    try{
        const hashePassword = bcrypt.hash(req.body.password,10);
        console.log(hashePassword);
        users.push({
            id : Date.now().toString(),
            name : req.body.name,
            email : req.body.email,
            password : hashePassword,
        })
        res.redirect('/login');
    }catch {
        res.redirect('/register');
    }
    
    console.log(users);
    
})

app.listen(3000);
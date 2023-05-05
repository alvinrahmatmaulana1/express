const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const session = require('express-session');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'review'
});

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: false}
}));

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const appRoute = require('./src/routes');
app.use('/', appRoute);

//tahap 4 membuat route & proses login
app.post('/login', function(req,res){
    let username = req.body.username;
    let password = req.body.password;

    if(username && password){

        connection.query('SELECT * FROM users WHERE username = ? AND password = ?' ,
        [username,password],function(error , results,fields) {
            
            if(error) throw error;

            if(results.length > 0){

                req.session.loggedin = true;
                req.session.username = username;
                req.session.password = password;

                res.send({
                    success: true,
                    message: 'Login Berhasil !'
                });
            } else {
                res.send({
                    success: false,
                    message: 'Login Gagal !'
                });
            }
            res.end();
        });
    } else {
        res.send({
            success: true,
            message: 'Pelease enter Username and Password !'
        });
        res.end();
    }
});

app.listen(
    process.env.APP_PORT,() => {
        console.log(`server berjalan http://localhost:${process.env.APP_PORT}`);
    }
)
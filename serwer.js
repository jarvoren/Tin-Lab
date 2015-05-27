/*jshint globalstrict: true, devel: true, node: true */
'use strict';

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var baza = require('./db/books');
var fs = require('fs');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    var genres = baza().order("genre").distinct("genre");
    res.render('index.ejs', {genres: genres});
});

app.get('/:gen', function (req, res) {
    var genres = baza().distinct("genre");
    var books = baza({genre: req.params.gen}).order("title").select("title", "author");
    var genre = req.params.gen;
    res.render('index.ejs', {genres: genres, books: books, genre: genre});
});

app.post('/:gen', function (req, res) {
    var newAuthor=req.body.author;
    var newTitle=req.body.title;
    var genre = req.params.gen;
    console.log(newAuthor, newTitle);
    if(req.body.login === "admin" && req.body.password==="nimda")
    {
        var book = baza.insert({"title": newTitle, "author": newAuthor, genre: genre});
    }
    var genres = baza().distinct("genre");
    var books = baza({genre: genre}).select("title", "author");



    res.render('index.ejs', {genres: genres, books: books, genre: genre});
});


app.listen(3000, function () {
    console.log('Serwer działa na porcie 3000');
});


process.on('SIGINT',function(){
    console.log('\nshutting down');
    fs.writeFileSync('C:\\baza.txt' , baza().select("title", "author","genre"));
    console.log(baza().select("title", "author","genre"));
    process.exit();
});

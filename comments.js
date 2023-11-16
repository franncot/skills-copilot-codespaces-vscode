// Create Web Server
// localhost:3000/comments

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// Get comments
router.get('/', function(req, res) {
    var file = path.join(__dirname, '../data/comments.json');
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(data);
    });
});

// Add comments
router.post('/', function(req, res) {
    var file = path.join(__dirname, '../data/comments.json');
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(file, JSON.stringify(comments), function(err) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(comments);
        });
    });
});

module.exports = router;
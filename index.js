var express = require("express");
var fs = require("fs");
var readline = require("readline");

var app = express();

var test = function(r, t) {
    for (var i in r) {
        var reg = new RegExp("(\\."+r[i]+")$");
        if (reg.test(t)) return true;
    }
    return false;
}

var replace = function(text) {
    var c = 0;
    for (var i = 0; i < 6; i++) {
        if (text.substr(i, 1) == "#") c++;
    }
    text = "<h"+(c+1)+">"+text.substr(c)+"</h"+(c+1)+">";
    text 
}

app.get("*", function(req, res) {
    if (test(["js", "css", "png"], req.url.toLowerCase())) {
        console.log("mooo");
    } else {
        if (test(["html"], req.url.toLowerCase())) {
            req.url = req.url.replace(/(\.html)$/, ".md");
        }
        else if (req.url == "/") {
            req.url = req.url + "index.md";
        }
        else if (!test("", req.url.toLowerCase())) {
            req.url = req.url + ".md";
        }
        
        var output = "";
        
        var rl = readline.createInterface({
            input: fs.createReadStream("./pages" + req.url)
        })
        
        rl.on("close", function() {
            
        })
        
        rl.on("line", function(line) {
            console.log(line.toString());
        })
        
        console.log("Else");
    }
    res.send("Helluuu");
});

app.listen(1337, function() {
    console.log("Listening to http://127.0.0.1:1337");
})


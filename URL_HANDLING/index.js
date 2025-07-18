const http = require('http')
const fs = require('fs')
const url = require('url')
const { parse } = require('path')

http.createServer((req,res) => {
    const parseURL = url.parse(req.url,true)
    console.log(parseURL);
    switch(parseURL.pathname){
        case "/":
            res.end(`Hello Mr.${parseURL.query.myName} welcome to the HomePage`);
            break;
        case "/about":
            const userName = parseURL.query.myName;
            const phno = parseURL.query.phno
            res.end(`Hello Mr. ${userName}, this is Sameer and this is my phone number ${phno}`);
            break;
        default:
            res.end("Done");
            break;   
    }
}).listen(3000, () => {
    console.log("Liisten bro!!!")
}) 
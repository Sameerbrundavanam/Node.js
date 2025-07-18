const http = require('http')
const fs = require('fs')
const server = http.createServer((req,res) => {
    const log = `Log recorded at: ${Date.now()} at ${req.url}\n`;
    fs.appendFile('./log.txt',log,
        (err,result) => {
            switch(req.url){
                case "/":
                    res.end("Welcome to Home Page")
                break
                case "/about":
                    res.end("I'm IAS")
                break
                default:
                    res.end("You are fucked up")
                break        
            }
        }
    );
    console.log("Log recorded");
}).listen(3000,() => {
    console.log("Bro, Listen at 3000")
})
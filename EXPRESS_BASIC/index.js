const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    console.log("You are in home page")
    res.end("Welcome to the home page")
})

app.get('/about',(req,res) => {
    console.log("You are in the about page")
    res.end("Welcome to the about page")
})



// function handler(req,res){
//     const log = `Log recorded at: ${Date.now()} at ${req.url}\n`;
//     fs.appendFile('./log.txt',log,
//         (err,result) => {
//             switch(req.url){
//                 case "/":
//                     res.end("Welcome to Home Page")
//                 break
//                 case "/about":
//                     res.end("I'm IAS")
//                 break
//                 default:
//                     res.end("You are fucked up")
//                 break        
//             }
//         }
//     );
//     console.log("Log recorded");
// }

//const server = http.createServer(app).listen(8000);

app.listen(8000,() => {
    console.log("Bro, go to the port number 8000 and see the magic you are making!!!");
})
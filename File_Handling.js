const fs = require('fs')
fs.writeFileSync('./output.txt',"Heroes are reborn!!!!")
var result = fs.readFileSync('./output.txt','utf-8')
console.log(result)
fs.appendFileSync('./output.txt'," Bro i'm extending you my mann!!!");
result = fs.readFileSync('./output.txt','utf-8')
console.log(result)
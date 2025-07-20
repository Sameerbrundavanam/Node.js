const fs = require('fs')

function createLog(fileName){
    return (req,res,next) => {
        fs.appendFile(
            fileName,
            `Log recorded at: ${Date.now()} from ip: ${req.ip} by method: ${req.method} from path: ${req.path} \n`,
            (err) => {
                if(err){
                    console.log("Error occured",err);
                }
                else{
                    console.log("Success mawa, Granddd Successsssssss !!!!")
                }
            }
        )
        next();
    }
}

module.exports = {
    createLog,
}
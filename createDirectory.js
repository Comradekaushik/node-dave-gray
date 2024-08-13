const fs = require('fs');
const fsPromises = require('fs/promises')
if(!fs.existsSync('./new')){
    fsPromises.mkdir('./new',(err)=>{
        if(err){
            throw err;
        }
        console.log("Directory Created");
    })
}

if(fs.existsSync('./new')){
    fs.rmdir('./new',(err)=>{
        if(err){
            throw err;
        }
        console.log("Directory deleted");
    })
}

// // Check if the file or directory exists asynchronously
// fs.stat(pathToFileOrDir, (err, stats) => {
//     if (err) {
//         // Handle the error (file/directory sdoesn't exist)
//     } else {
//         // Do something
//     }
// });
const fs = require('fs');
const path = require('path');
// const fsPromises = require('fs/promises');
const fsPromises = require('fs').promises;
const { error } = require('console');



// OPen last chat with bing
// .then( https://javascript.info/promise-basics ). then( https://www.programiz.com/javascript/promise     ).then( https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises ).then( https://www.notion.so/Asynchronous-Javascript-92c6cd9b48824e60983f58ca550ff0e5 ).then( https://javascript.info/async-await ) and then vscode








// fs.readFile('./files/starter.txt','utf-8',(err,data)=>{
//     if(err){
//         console.error(`here is the ${err} ${err.errno}\n\n\n`);
//         throw err;
//     }
//     else{
//         console.log(data);
//         // console.log(data.toString()); //without 'utf-8' parameter
//     }
// })


// fs.readFile(path.join(__dirname,'files','starter.txt'),'utf-8',(err,data)=>{
//     if(err){
//         console.error(`here is the ${err} ${err.errno}\n\n\n`);
//         throw err;
//     }
//     else{
//         console.log(data);
//         // console.log(data.toString()); //without 'utf-8' parameter
//     }
// })

//exit on uncaught errors

process.on('uncaughtException',(err)=>{
    console.error(`There was an ${err}`);
    process.exit(1);
})





// fs.writeFile(path.join(__dirname,'files','reply.txt'),"text to write ",'utf-8',(err)=>{
//     if(err){
//         console.error(`here is the ${err} ${err.errno}\n\n\n`)
//         throw err;
//     }
//     else{
//         console.log("write completed");
//     }
// })

// fs.appendFile(path.join(__dirname,'files','test2.txt'),"text to append ",'utf-8',(err)=>{
//     if(err){
//         console.error(`here is the ${err} ${err.errno}\n\n\n`)
//         throw err;
//     }
//     else{
//         console.log("append completed");
//     }
// })








//in nested callback
// fs.writeFile(path.join(__dirname,'files','reply.txt'),"text to write ",'utf-8',(err)=>{
//     if(err){
//         console.error(`here is the ${err} ${err.errno}\n\n\n`)
//         throw err;
//     }
//     else{
//         console.log("write completed");
//         fs.appendFile(path.join(__dirname,'files','reply.txt'),"text to append ",'utf-8',(err)=>{
//             if(err){
//                 console.error(`here is the ${err} ${err.errno}\n\n\n`)
//                 throw err;
//             }
//             else{
//                 console.log("append completed");
//                 fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','Renamed-new-file-name.txt'),(err)=>{
//                     if(err){
//                         console.error(`here is the ${err} ${err.errno}\n\n\n`)
//                         throw err;
//                     }
//                     else{
//                         console.log("rename completed");
//                     }
//                 })
//             }
//         })
//     }
// })


//Avoiding this callback hell by using Async Await
fs.writeFile(path.join(__dirname,'files','starter.txt'),"New data",'utf-8',(err)=>{
    if(err){
      console.log(err);  
    }
    else{
        console.log("Write Completed");
    }
    
});


const fileops =  async ()=>{
    try{
        const data = await
            fsPromises.readFile(path.join(__dirname,'files','starter.txt'),'utf-8'
            );
        console.log(data);
        console.log('ok');


        //Deleting a file
        await fsPromises.unlink(path.join(__dirname,'files','starter.txt'));
        

        await fsPromises.writeFile(path.join(__dirname,'files','usingfs_promises.txt'),data);
        await fsPromises.appendFile(path.join(__dirname,'files','usingfs_promises.txt'),'\n\n nice to meet you');

        const newdata = await fsPromises.readFile(path.join(__dirname,'files','usingfs_promises.txt'),'utf-8');
        console.log(`Now the new data is ${newdata}`);

    }
    catch(err){
        console.log(err);

    }
}



fileops();







// using simple promises (elementary approach)



// let promise = new Promise(function(resolve, reject) {
//     fs.readFile(path.join(__dirname,'files','starter.txt'),'utf-8',(err,data)=>{
//         if(err){
//             console.error(`here is the ${err} ${err.errno}\n\n\n`);
//             reject(err);
//             throw err;
            
//         }
//         else{
            
//             resolve(data);

//         }
//     })
    
//   });
  

  
//   promise.then(
//     (result)=>{
//         console.log(`Hi the result is : ${result}`);

//     return new Promise((resolve, reject) => {
//         fs.writeFile(path.join(__dirname,'files','newUsngPromise.txt'), `new text using Promise asynchronous approach and result of reading the previous file ${result}`, (err) => {
//             if(err){
//                 console.error(`New Error ${err}`);
//                 reject(err);
//             } else {
//                 resolve('File written successfully');
//             }
//         });
//     });
// }
    

// ).then((data)=>{console.log(`Data recieved at last ${data}`); });
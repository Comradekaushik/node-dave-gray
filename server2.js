const http = require('http');
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;



const PORT = process.env.PORT || 3502;

const server = http.createServer(async (req,res)=>{

    try{
        if(req.url === '/other-info.html'){
            const data = await fsPromises.readFile(path.join(__dirname,'views','other-info.html'),'utf-8')
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
            
        }


    }
    catch(err){
        console.log(err);
        res.writeHead(500);
        res.end('An error occurred on the server.');
    }
});

server.listen(PORT,()=>{console.log(`Server Running on Port ${PORT}`)});
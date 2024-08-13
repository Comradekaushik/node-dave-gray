const http = require('http');
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;

const PORT = process.env.PORT || 3502;






const server = http.createServer(async (req,res)=>{



    const extension = path.extname(req.url);
    let contentType = 'text/html';

    switch(extension){
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;            
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;            
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.pdf':
            contentType = 'application/pdf';
            break;
        case '.doc':
            contentType = 'application/msword';
            break; 
        case '.eot':
            contentType = 'application/vnd.ms-fontobject';
            break;
        case '.ttf':
            contentType = 'application/font-sfnt';
            break;       
        default:
            contentType = 'text/html'              
    };



    try{
        //working correctly
        if(req.url === '/'){
            readdata= await fsPromises.readFile(path.join(__dirname,'views','index.html'),'utf-8');
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(readdata);
            res.end();

        }
        else{
            servefile(path.join(__dirname,'views',req.url),contentType,res);

        }
        



    }
    catch(err){
        console.log("error in createserver");
        console.error(err);
        

    }

    
});





const servefile = async(filePath,contentType,response)=>{

    var readdata;

    try {

        if (fs.existsSync(filePath)) {
            readdata= await fsPromises.readFile(filePath,'utf-8');
            
            response.writeHead(200, { 'Content-Type': contentType });
            response.write(readdata);
            response.end();
            
        }
        else {

            readdata= await fsPromises.readFile(path.join(__dirname,'views','404v1.html'),'utf-8');
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.write(readdata);
            response.end();

            
        }
        





    }
    catch(error){
        console.log('The file does not exist.');
        response.writeHead(500);
        response.end('Something Went Wrong : Serverside fault---file doesn\'t exists');


    }

}   

server.listen(PORT,()=>{console.log(`Server Running on Port ${PORT}`)});


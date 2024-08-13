const http = require('http');
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;






const PORT = process.env.PORT || 3500;

const servefile = async(filePath,contentType,response)=>{
    // try{
    //     const data = await fsPromises.readFile(filePath,'utf-8');
    //     response.writeHead(200,{'Content-Type' : contentType});
    //     response.end(data);

    // }
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType }
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    }
    catch(err){
        console.log(err);
        response.statusCode = 500;
        response.end('Server Error');
    }
};






const server = http.createServer(
    (req,res)=>{



        // let filePath;
        // if(req.url === '/' || req.url === 'index.html'){
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type','text/html');
        //     filePath = path.join(__dirname,'views','index.html');
        //     fs.readFile(filePath,'utf-8',(err,data)=>{
        //         res.end(data);
        //     })

        // }


        const extension = path.extname(req.url);
        let contentType;

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
            default:
                contentType = 'text/html'              
        }

        let filePath = 'nowildpointer';
        if(contentType === 'text/html' && req.url === '/'){
            filePath = path.join(__dirname,'views','index.html');

        }
        // else if(contentType === 'text/html' && req.url.slice(-1) === '/'){
        //     filePath = path.join(__dirname,'views', req.url ,'index.html');

        // }
        else if(contentType === 'text/html' ){
            filePath = path.join(__dirname,'views', req.url );

        }
        else {
            filePath = path.join(__dirname, req.url );

        }

        if(!extension && req.url.slice(-1) !== '/'){
            filePath += '.html';
        }


        const fileExists = fs.existsSync(filePath);

        if(fileExists){
            //serve the file
            // servefile(filePath, contentType , res);
            servefile(filePath, contentType , res);

        }
        else{
            //404
            //301 redirect
            console.log(path.parse(filePath));

            


            switch (path.parse(filePath).base) {
                case 'old-page.html':
                    res.writeHead(301, { 'Location': '/new-page.html' });
                    
                    res.end();
                    break;
                case 'wwwpage.html':
                    res.writeHead(301, { 'Location': '/new-page.html' });
                    res.end();
                    break;
                default:
                    servefile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
            }
        
            console.log(req.url,req.method);
        }
});



server.listen(PORT,()=>{console.log(`Server Running on Port ${PORT}`)})

















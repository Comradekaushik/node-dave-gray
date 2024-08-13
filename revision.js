const http = require('http');
const server = http.createServer(async (req, res) => {
    if (req.url === '/post' && req.method === 'POST') {
        let data = ''; // Initialize data as an empty string
        req.on('data', (chunk) => {
            // data += chunk;
            data += chunk.toString();
        });

        

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log(JSON.parse(data).name);
            res.end(data);
        });
    }
});




server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
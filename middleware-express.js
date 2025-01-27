const express = require('express');
const app = express();
const path = require('path');
const logEvents = require("./middleware/logevents.js");
const cors= require('cors');
const corsOptions = require('./config/corsOptions.js')
const errorHandler = require('./middleware/errorHandler');

const verifyJWT = require("./middleware/verifyJWT.js");
const cookieParser = require("cookie-parser");


const PORT = process.env.PORT || 3500;








//custom middleware logger

app.use((req,res,next)=>{
    logEvents.logEvents(`${req.method}\t ${req.headers.origin} \t${req.url}`,'reqLog.txt');
    console.log(`Method: ${req.method} Path: ${req.path}`);
    next();
})


//third-party-middleware CORS using npm i cors

//Cross Origin Resource Sharing
// const whitelist = ['https://www.caleve.org','https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// }
app.use(cors(corsOptions));//for open-to-public API




//built in middleware to handle urlencodeddata in other words form data
// 'content-type: application/x-www-form-urlencoded'




app.use(express.urlencoded({extended: false}));

//built in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser);


//serve static files
app.use(express.static(path.join(__dirname,'/public')));
//default is app.use('/',express.static(path.join(__dirname,'/public')));

app.use('/subdir',express.static(path.join(__dirname,'/public')));
//Above : Instructing express to pass static files to subdir


//to serve the root directory files
app.use('/',require('./routes/root.js'));
//to serve the subdir directory files
app.use('/subdir',require('./routes/subdir.js'));

app.use('/register',require('./routes/register.js'));

app.use('/auth',require('./routes/auth.js'));
// app.use('/refresh',require('./routes/refresh.js'));
app.use(verifyJWT); 
//works like a waterfall all the routes below it
//will use this middleware

app.use('/employees',require('./routes/api/employees.js'));



console.log(path.join(__dirname,'/public'));






//    (.html)? => this expression means html is optional
// app.get('^/$|index(.html)?',(req,res) => {
//     // res.send("Hello World !");
//     // res.sendFile('./views/index.html',{ root: __dirname});
//     res.sendFile(path.join(__dirname,'views','index.html'));
// })

// app.get('/new-page(.html)?',(req,res) => {
    
//     res.sendFile(path.join(__dirname,'views','new-page.html'));
// })

// app.get('/old-page(.html)?',(req,res) => {
    
//     res.redirect(301,'/new-page.html');  //sends 302 by default
// })








// app.get('/*', (req,res) => {
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'));
// })

// app.all('*', (req,res) => {
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'));
// })

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


app.use(errorHandler);


app.listen(PORT,()=>{console.log(`Server Running on Port ${PORT}`)});

















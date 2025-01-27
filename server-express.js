const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3500;

//    (.html)? => this expression means html is optional
app.get('^/$|index(.html)?',(req,res) => {
    // res.send("Hello World !");
    // res.sendFile('./views/index.html',{ root: __dirname});
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.get('/new-page(.html)?',(req,res) => {
    
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})

app.get('/old-page(.html)?',(req,res) => {
    
    res.redirect(301,'/new-page.html');  //sends 302 by default
})


//Route handlers
app.get('/hello(.html)?',(req,res,next) => {
    console.log("Attempted to Load hello.html");
    next();


},(req,res) => {
    res.send("hello king")
})



//chaining route handlers

const one = (req,res,next) => {
    console.log("one");
    next();

} 

const two = (req,res,next) => {
    console.log("two");
    next();

}

const three = (req,res,next) => {
    console.log("three");
    res.send("finished");
    

}

app.get('/chain(.html)?' , [one , two , three]);





app.get('/*', (req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})


app.listen(PORT,()=>{console.log(`Server Running on Port ${PORT}`)});

















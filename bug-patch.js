const fs = require('fs');
const path = require('path');



if(fs.existsSync(path.join(__dirname,'views','new-page.html'))){
    console.log('new-page.html exists');
}
else{
    console.log('No,it doesn\'t');
}
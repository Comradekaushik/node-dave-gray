const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;


const rs = fs.createReadStream(path.join(__dirname,'files','lorem.txt'),{encoding:'utf-8'}) ;

const ws = fs.createWriteStream(path.join(__dirname,'files','new-lorem.txt')) ;

 

rs.pipe(ws).on('finish', () => {
    // Once all data is written, append additional text
    fs.appendFile(path.join(__dirname, 'files', 'new-lorem.txt'), ' linebreak\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n ', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Append operation complete.');
        }
    });
});
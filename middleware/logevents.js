const { format} = require('date-fns');
const { v4: uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const logEvents = async (message,logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(`Logitem : ${logItem}`);
    try{
        
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        console.log("Here");
        // await fsPromises.appendFile(path.join(__dirname,'..', 'logs', 'eventLog.txt'), logItem);
        await fsPromises.appendFile(path.join(__dirname,'..' ,'logs', logName), logItem);
        console.log("there");
    } 
    catch (err) {
        console.error(err);
    }
    
    };
    console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
    console.log(uuid());

    module.exports = {logEvents}
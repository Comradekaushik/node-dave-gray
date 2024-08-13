// 1:15
const logEvents = require('./logEvents.js');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{};

const Emitter = new MyEmitter();

//add listener for the log events

Emitter.on('log',(msg)=>{logEvents.logEvents(msg)});

setTimeout(()=>{
    //emit event
    Emitter.emit('log','log event emitted');
},2000);
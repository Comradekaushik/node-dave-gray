const usersDB = {
    users : require('../data/users.json'),
    setUsers : function (data) {
        this.users = data;
    }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcryptjs = require("bcryptjs");





const handleNewUser = async(req,res)=>{
    const{user, pwd} = req.body;

    if(!user || !pwd){
        return (res.status(400).json({'message' : 'username and password are required'}));

    }

    //check for duplicate usernames in the db

    const duplicate = usersDB.users.find(person => person.username === user);

    if(duplicate){
        return res.sendStatus(409); //conflict
    }


    try{  
        //encrypt the password using 3rd party library
        const hashedPwd = await bcryptjs.hash(pwd,10);

        //store the new user
        const newUser = {"username" : user, "password" : hashedPwd} ;

        usersDB.setUsers([...usersDB.users,newUser]);
        await fsPromises.writeFile(path.join(__dirname,'..',"data","users.json"),
        JSON.stringify(usersDB.users));


        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` });




    }
    catch{
        res.status(500).json({ 'message': err.message });

    }
}


module.exports = { handleNewUser };
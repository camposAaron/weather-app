const fs = require('fs');
const path = './db/historydb.json'

const saveInDB = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

const readInDB = () =>{
    if(!fs.existsSync(path))
        return null;
    
    const data =  fs.readFileSync(path,{ encoding: 'utf-8' });
    return JSON.parse(data);
}

module.exports = {
    saveInDB,
    readInDB
}

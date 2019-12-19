const {writeFile} = require('nodeutilz');
module.exports = async function (log,logName){
    if (log.then) {
        const promiseLog = await log;
        return writeFile(`./logs/${logName}_${Date.now()}.json`,JSON.stringify(promiseLog,null,'\t'),'utf8');
    } else {
        return writeFile(`./logs/${logName}_${Date.now()}.json`,JSON.stringify(log,null,'\t'),'utf8');
    } 
}
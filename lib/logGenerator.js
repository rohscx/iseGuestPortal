const {writeFile} = require('nodeutilz');
module.exports = function (log,logName){
    return writeFile(`./logs/${logName}_${Date.now()}.json`,JSON.stringify(log,null,'\t'),'utf8');
}
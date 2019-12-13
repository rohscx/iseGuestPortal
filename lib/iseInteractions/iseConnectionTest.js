const {asyncRequest } = require('nodeutilz'); 
const generateTestAuth = require('../generateTestAuth.js');
const jsonParse = require('../jsonParse.js');
const addAuthData = require('../addAuthData.js');




module.exports = function (server,auth,group){
    return new Promise ((resolve,reject) => {   
        asyncRequest(generateTestAuth('GET',group,auth,server))
        .then(jsonParse)
        .then((t) => addAuthData(t,{server,auth,group}))
        .then(resolve)
        .catch(console.log)
        
        
        
    })
}
const {asyncRequest } = require('nodeutilz'); 
const generateEndpointAuth = require('../generateEndpointAuth.js');
const jsonParse = require('../jsonParse.js');
const requestPaging = require('../requestPaging.js');
const deleteEnpoints = require('../deleteEndPoints.js');



module.exports = function (server,auth,group){
    return new Promise ((resolve,reject) => {
        //const loggingFilePath = '../../export/prePurgeDevicesGuestFce_'
        
        asyncRequest(generateEndpointAuth('GET',group,auth,server))
        .then(jsonParse)
        .then((t) => {
            // add authData
            t.authData = {server,auth,group};
            return t;
        })
        .then(requestPaging)
        .then(deleteEnpoints)
        .then(resolve)
        .catch(console.log)
        
        
        
    })
}
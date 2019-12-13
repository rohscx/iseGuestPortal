const {asyncRequest } = require('nodeutilz'); 
const generateEndpointAuth = require('../generateEndpointAuth.js');
const jsonParse = require('../jsonParse.js');
const requestPaging = require('../requestPaging.js');
const iseConnectionTest = require('./iseConnectionTest.js');
const addAuthData = require('../addAuthData.js');



module.exports = function (server,auth,group){
    return new Promise ((resolve,reject) => {
        //const loggingFilePath = '../../export/prePurgeDevicesGuestFce_'
        iseConnectionTest(server,auth,group)
        .then((t) => new Promise((resolve) => 
            asyncRequest(generateEndpointAuth('GET',t.authData.group,t.authData.auth,t.authData.server))
                .then(jsonParse)
                .then((t) => resolve(addAuthData(t,{group,auth,server})))
            )
        )
        .then(requestPaging)
        .then(resolve)
        .catch(reject)
    })
}
const {asyncRequest } = require('nodeutilz'); 
const generateInternalUserAuth = require('../generateInternalUserAuth');
const jsonParse = require('../jsonParse.js');
const requestPaging = require('../requestPaging.js');
const iseConnectionTest = require('./iseConnectionTest.js');
const addAuthData = require('../addAuthData.js');



module.exports = function (server,auth,group,userName,userPassword){
    return new Promise ((resolve,reject) => {
        //const loggingFilePath = '../../export/prePurgeDevicesGuestFce_'
        //console.log(userPassword)
        if (!server || !auth || !group || !userName || !userPassword) return reject(`Missing  one or more of the following arguments: server,auth,group,userName,userPassword`)
        iseConnectionTest(server,auth,group)
        //.then((t) => resolve(generateInternalUserAuth('PUT',t.authData.group,t.authData.auth,t.authData.server,userName,userPassword)))
        .then((t) => new Promise((resolve) => 
            asyncRequest(generateInternalUserAuth('PUT',t.authData.group,t.authData.auth,t.authData.server,userName,userPassword))
                .then(resolve)
                .catch(reject)
            )
        )
        .then(resolve)
        .catch(reject)
    })
}
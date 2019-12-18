const {asyncRequest } = require('nodeutilz'); 
const generateEndpointAuth = require('../generateEndpointAuth.js');
const generateGenericGet = require('../generateGenericGet.js');
const jsonParse = require('../jsonParse.js');
const requestPaging = require('../requestPaging.js');
const iseConnectionTest = require('./iseConnectionTest.js');
const addAuthData = require('../addAuthData.js');

module.exports = function (server,auth,group){
    return new Promise ((resolve,reject) => {
        //const loggingFilePath = '../../export/prePurgeDevicesGuestFce_'
        iseConnectionTest(server,auth,group)
        .then(async (t)  => {
   
            const groupIdUrl = `https://${t.authData.server}/ers/config/endpointgroup/${t.authData.group}`;
            //console.log(generateGenericGet('GET',groupIdUrl,t.authData.auth,t.authData.server))
            const groupData = await asyncRequest(generateGenericGet('GET',groupIdUrl,t.authData.auth,t.authData.server)).then(JSON.parse)
            const endPoint = await new Promise((resolve) => 
            asyncRequest(generateEndpointAuth('GET',t.authData.group,t.authData.auth,t.authData.server))
                .then(jsonParse)
                .then((t) => resolve(addAuthData(t,{group,auth,server}))));
                //console.log(groupData)
            endPoint.authData.name = groupData.EndPointGroup.name;
            return endPoint;
        })
        .then(requestPaging)
        .then(resolve)
        .catch(reject)
    })
}
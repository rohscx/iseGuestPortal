const deleteIseEndPoints = require('../iseInteractions/deleteIseEndPoints.js');
const updateInterUserPassword = require('../iseInteractions/updateInterUserPassword.js');
const iseEndPoints = require('../iseInteractions/iseEndPoints.js');
const logGenerator = require('../logGenerator.js');
module.exports = function (iseServer,iseAuth,data,callBack){
    logGenerator(Promise.all(data.map(({epigId,}) => iseEndPoints(iseServer,iseAuth,epigId))).then(progressBar).then((t) => Promise.all(t.map(deleteIseEndPoints))).catch(console.log),"bulkGuestEndpointDelete_");
    logGenerator(Promise.all(data.map(({iuId,iuName,iuPassword}) => updateInterUserPassword(iseServer,iseAuth,iuId,iuName,iuPassword).then(((t) => {logGenerator(t,`guestPasswordUpdate_${iuName.toUpperCase()}_`); if (JSON.stringify(t).search('ERROR') != -1) console.log({[iuName]:t.ERSResponse.messages})})).catch(console.log))),"guestPasswordUpdate");
    //return callBack();
}
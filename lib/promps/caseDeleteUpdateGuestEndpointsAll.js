const deleteIseEndPoints = require('../iseInteractions/deleteIseEndPoints.js');
const updateInterUserPassword = require('../iseInteractions/updateInterUserPassword.js');
module.exports = function (iseServer,iseAuth,data,callBack){
    data.map(({epigId}) => deleteIseEndPoints(iseServer,iseAuth,epigId).then(console.log).catch(console.log));
    data.map(({iuId,iuName,iuPassword}) => updateInterUserPassword(iseServer,iseAuth,iuId,iuName,iuPassword).then((t) => console.log(JSON.stringify(t, null, '\t'))).catch((t) => console.log("reject \n" + JSON.stringify(t, null, '\t'))));
    //return callBack();
}
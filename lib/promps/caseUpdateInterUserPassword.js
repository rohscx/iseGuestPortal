const updateInterUserPassword = require('../iseInteractions/updateInterUserPassword.js');
module.exports = function (iseServer,iseAuth,iuId,iuName,iuPassword,callBack){
    updateInterUserPassword(iseServer,iseAuth,iuId,iuName,iuPassword).then((t) => console.log(JSON.stringify(t, null, '\t'))).catch((t) => console.log("reject \n" + JSON.stringify(t, null, '\t')))
    //return callBack();
}
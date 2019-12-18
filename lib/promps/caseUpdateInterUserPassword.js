const updateInterUserPassword = require('../iseInteractions/updateInterUserPassword.js');
const logGenerator = require('../logGenerator.js');
module.exports = function (iseServer,iseAuth,iuId,iuName,iuPassword,callBack){
    updateInterUserPassword(iseServer,iseAuth,iuId,iuName,iuPassword).then(((t) => {logGenerator(t,`guestPasswordUpdate_${iuName.toUpperCase()}_`); if (JSON.stringify(t).search('ERROR') != -1) console.log({[iuName]:t.ERSResponse.messages})})).catch(console.log)
    //return callBack();
}
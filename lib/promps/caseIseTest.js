const iseConnectionTest = require('../iseInteractions/iseConnectionTest.js');
module.exports = function (iseServer,iseAuth,epigId,callBack){
    iseConnectionTest(iseServer,iseAuth,epigId).then().catch(console.log)
    //return callBack();
}
const deleteIseEndPoints = require('../iseInteractions/deleteIseEndPoints.js');
module.exports = function (iseServer,iseAuth,epigId,callBack){
    deleteIseEndPoints(iseServer,iseAuth,epigId).then(console.log).catch(console.log)
    //return callBack();
}
const deleteIseEndPoints = require('../iseInteractions/deleteIseEndPoints.js');
const updateInterUserPassword = require('../iseInteractions/updateInterUserPassword.js');
module.exports = function (iseServer,iseAuth,data,callBack){
    data.map(({epigId}) => deleteIseEndPoints(iseServer,iseAuth,epigId).then(console.log).catch(console.log));
    //return callBack();
}
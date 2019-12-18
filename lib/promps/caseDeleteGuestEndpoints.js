const deleteIseEndPoints = require('../iseInteractions/deleteIseEndPoints.js');
const logGenerator = require('../logGenerator.js');
module.exports = function (iseServer,iseAuth,epigId,callBack){
    deleteIseEndPoints(iseServer,iseAuth,epigId).then(((t) => logGenerator(t,"endpointDeletion"))).catch(console.log)
    //return callBack();
}
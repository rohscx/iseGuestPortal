const deleteIseEndPoints = require('../iseInteractions/deleteIseEndPoints.js');
const iseEndPoints = require('../iseInteractions/iseEndPoints.js')
const logGenerator = require('../logGenerator.js');
const progressBar = require('../progressBar.js');
module.exports = function (iseServer,iseAuth,epigId,callBack){
    iseEndPoints(iseServer,iseAuth,epigId).then(progressBar).then(deleteIseEndPoints).then(((t) => logGenerator(t,"endpointDeletion"))).catch(console.log);
    //return callBack();
}
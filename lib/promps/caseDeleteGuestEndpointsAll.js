const iseEndPoints = require('../iseInteractions/iseEndPoints.js');
const deleteIseEndPoints = require('../iseInteractions/deleteIseEndPoints.js');
const progressBar = require('../progressBar.js');
const logGenerator = require('../logGenerator.js');
module.exports = function (iseServer,iseAuth,data,callBack){
    logGenerator(Promise.all(data.map(({epigId,}) => iseEndPoints(iseServer,iseAuth,epigId))).then(progressBar).then((t) => Promise.all(t.map(deleteIseEndPoints))).catch(console.log),"bulkGuestEndpointDelete_");
    //data.map(({epigId}) => iseEndPoints(iseServer,iseAuth,epigId).then(deleteIseEndPoints).then(((t) => logGenerator(t,"endpointDeletion"))).catch(console.log));
    //return callBack();
}
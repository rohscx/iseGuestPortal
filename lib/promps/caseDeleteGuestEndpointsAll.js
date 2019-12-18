const deleteIseEndPoints = require('../iseInteractions/deleteIseEndPoints.js');
const logGenerator = require('../logGenerator.js');
module.exports = function (iseServer,iseAuth,data,callBack){
    data.map(({epigId}) => iseEndPoints(iseServer,iseAuth,epigId).then(deleteIseEndPoints).then(((t) => logGenerator(t,"endpointDeletion"))).catch(console.log));
    //return callBack();
}
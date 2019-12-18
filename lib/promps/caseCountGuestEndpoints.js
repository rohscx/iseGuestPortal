const iseEndpoints = require('../iseInteractions/iseEndPoints.js');
module.exports = function (iseServer,iseAuth,epigId,callBack){
    iseEndpoints(iseServer,iseAuth,epigId).then((t) => console.log(`\n EPIG ${t.name} contains ${t.cache.length} Endpoints \n`)).catch(console.log);
    //return callBack();
}
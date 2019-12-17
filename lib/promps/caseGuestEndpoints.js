const iseEndpoints = require('../iseInteractions/iseEndPoints.js');
module.exports = function (iseServer,iseAuth,epigId,callBack){
    iseEndpoints(iseServer,iseAuth,epigId).then((t) => console.log({[t.name]: t.cache.map(({id, name}) => name)})).catch(console.log)
    //return callBack();
}
const iseEndpoints = require('../iseInteractions/iseEndPoints.js');
module.exports = function (iseServer,iseAuth,epigId,callBack){
    epigId.map((d) => iseEndpoints(iseServer,iseAuth,d).then((t) => console.log({[t.name] :t.cache.map(({id, name}) => name)})).catch(console.log))
    //return callBack();
}
const iseEndpoints = require('../iseInteractions/iseEndPoints.js');
module.exports = function (iseServer,iseAuth,epigId,callBack){
    //epigId.map((d) => iseEndpoints(iseServer,iseAuth,d).then((t) => console.log(`\n\n\nEPIG ${t.name} contains ${t.cache.length} MAC Addresses \n\n\n`)).catch(console.log))
    //epigId.map((d) => iseEndpoints(iseServer,iseAuth,d).then((t) => t.cache.length).catch(console.log))
    (async function (){
        const total = await epigId.reduce( async (n,o) => {
            const result = await iseEndpoints(iseServer,iseAuth,o).then((t) => ({length: t.cache.length, message: `\nEPIG ${t.name} contains ${t.cache.length} Endpoints \n`})).catch(console.log);
            console.log(result.message);
            // how goofy is this???
            return await n + result.length;
        },0);
        console.log(`Total Guest WiFi Endpoints: ${total}`)
    })()
   
    //return callBack();
}
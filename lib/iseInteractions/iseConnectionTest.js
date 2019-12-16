const {asyncRequest } = require('nodeutilz'); 
const generateTestAuth = require('../generateTestAuth.js');
const gemerateGenericGet = require('../generateGenericGet.js');
const jsonParse = require('../jsonParse.js');
const addAuthData = require('../addAuthData.js');

module.exports = function (server,auth,group){
    return new Promise ((resolve,reject) => {   
        asyncRequest(generateTestAuth('GET',group,auth,server))
        .then(jsonParse)
        .then((t) => {
            const {resources} = t.SearchResult;
            const links = resources.map(({id,name,link}) => link.href);
            // group is left out during the test.
            if(!group) Promise.all(links.map((d) => asyncRequest(gemerateGenericGet('GET',d,auth,server))))
                        .then((t) => console.log(t.map((d) => JSON.parse(d)).map(({Node}) => ["Retrieved Server:",Node.name, Node.ipAddresses, Node.gateWay].join(' ')).join('\n')));
            return t;
        })
        .then((t) => addAuthData(t,{server,auth,group}))
        .then(resolve)
        .catch(console.log)
        
        
        
    })
}
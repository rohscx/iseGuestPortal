const {asyncRequest } = require('nodeutilz'); 
const generateTestAuth = require('./generateTestAuth.js');
const jsonParse = require('./jsonParse.js');
const requestPaging = require('./requestPaging.js');

module.exports = function (data){
    return new Promise ((resolve,reject) => {
        const {SearchResult, authData} = data;
        const {resources} = SearchResult;
        const resourcesExist = resources.length > 0;
        if (resourcesExist) {
            return resolve(data)
        } else {
            return reject(data);
        }

    })
}
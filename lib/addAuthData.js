const {asyncRequest } = require('nodeutilz'); 
const generateTestAuth = require('./generateTestAuth.js');
const jsonParse = require('./jsonParse.js');
const requestPaging = require('./requestPaging.js');




module.exports = function (data,authData){
    return new Promise ((resolve,reject) => {
        if (!data || !authData) return reject("Missing request Data or Auth Data");
        const dataObject = {...data, authData}      
        resolve(dataObject);
    })
}
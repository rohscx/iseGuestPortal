const {asyncRequest } = require('nodeutilz'); 
const Bottleneck =  require("bottleneck");

const generateGenericGet = require('../generateGenericGet.js');

module.exports = async (data) => {
  const {name, multibar,largestLength,barMax} = data;
  const {server, auth, group} = data.authData;
  const limiter = new Bottleneck({
    maxConcurrent: 5,
    minTime: 600
  });



// used during testing
const delay = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000))

  
  const workerFunction = async (data,server,auth, options) => {
    const {name, link, authData} = data;
    const {href} = link;
    const{bar, multibar, largestLength,isDone} = options;
    const deleteEndpointOptions = (host, authorization, url) => { 
      return {
          'method': 'DELETE',
          'url': url,
          'headers': {
            'Accept': 'application/json',
            'Authorization': authorization,
            'Cache-Control': 'no-cache',
            'Host': host,
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive'
          }
      }
    };
    bar.increment();
    // test
    //const requestData = await delay(1).then("FAKE:" + href)
    const requestData = await asyncRequest(deleteEndpointOptions(server, auth, href));
    if (isDone) multibar.stop();
    return {"DELETED" : `${name} \n${requestData}`.toUpperCase()}

  };
  const endOfArray = (data, index) => {
    // return a boolean. Have you reached the end of the array or not. 
    const lengthNormalized = data;
    const indexNormalized = index + 1;
    return (lengthNormalized === indexNormalized);
  }
  // check for data in the array. If there is no data reject the request.
  if (data.cache.length == 0) {
    return new Promise((resolve,reject) => resolve({[name]:"NOTHING TO DELETE, EPIG IS LIKEY EMPTY"}))
  } else {
    //const barMax = data.cache.length;
    const bar = multibar.create(barMax, 0,{task:"Deleting EndPoints From: "+name});
    return Promise.all(data.cache.map((d, i) => limiter.schedule(() => workerFunction(d, server, auth,{bar,multibar, isDone:endOfArray(largestLength,i)}))))
  }; 
}  
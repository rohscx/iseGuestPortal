const {asyncRequest } = require('nodeutilz'); 
const Bottleneck =  require("bottleneck");


module.exports = (data) => {
  const {server, auth, group} = data.authData;
  const limiter = new Bottleneck({
    maxConcurrent: 5,
    minTime: 600
  });
  const workerFunction = async (data,server,auth) => {
    const {name, link, authData} = data;
    const {href} = link;
   
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
    
    const requestData = await asyncRequest(deleteEndpointOptions(server, auth, href));
    return {"DELETED" : `${name} \n${requestData}`.toUpperCase()}

  };
  // check for data in the array. If there is no data reject the request.
  if (data.length == 0) {
    return new Promise((resolve,reject) => reject('\n\nAlert!!\n\n\nNothing To Delete, EPIG Is Likey Empty\n\n\n'.toUpperCase()))
  } else {
    return Promise.all(data.cache.map((d) => limiter.schedule(() => workerFunction(d, server, auth))))
  }; 
}  
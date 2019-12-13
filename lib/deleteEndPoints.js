const {asyncRequest } = require('nodeutilz'); 
const Bottleneck =  require("bottleneck");


module.exports = (data) => {
  const limiter = new Bottleneck({
    maxConcurrent: 2,
    minTime: 600
  });
  const workerFunction = async (data) => {
    const {name, link, authData} = data;
    const {href} = link;
    const {server, auth, group} = authData;
    const deleteEndpointOptions = (server, auth, data) => { 
      return {
          'method': 'DELETE',
          'url': data,
          'headers': {
            'Accept': 'application/json',
            'Authorization': auth,
            'Cache-Control': 'no-cache',
            'Host': server,
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive'
          }
      }
    };
    
    const requestData = asyncRequest(deleteEndpointOptions(server, auth, href));
    return {"DELETED" : `${name} \n${requestData}`.toUpperCase()}

  };
  // check for data in the array. If there is no data reject the request.
  if (data.length == 0) {
    return new Promise((resolve,reject) => reject('\n\nAlert!!\n\n\nNothing To Delete, EPIG Is Likey Empty\n\n\n'.toUpperCase()))
  } else {
    return Promise.all(data.map((d) => limiter.schedule(() => workerFunction(d))))
  }; 
}  
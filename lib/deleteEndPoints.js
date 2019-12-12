const {asyncRequest } = require('nodeutilz'); 
const Bottleneck =  require("bottleneck");


module.exports = (data) => {
  const limiter = new Bottleneck({
    maxConcurrent: 2,
    minTime: 600
  });
  const workerFunction = (data) => {
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
    console.log(`deleting: ${name}`);
    return  asyncRequest(deleteEndpointOptions(server, auth, href))
  }
  return Promise.all(data.map((d) => limiter.schedule(() => workerFunction(d))))
}  
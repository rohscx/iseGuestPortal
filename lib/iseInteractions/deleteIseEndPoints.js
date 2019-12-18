const {asyncRequest } = require('nodeutilz'); 
const Bottleneck =  require("bottleneck");
const cliProgress = require('cli-progress');
const _colors = require('colors');
const generateGenericGet = require('../generateGenericGet.js');


module.exports = async (data) => {
  const {name} = data;
  const {server, auth, group} = data.authData;
  const limiter = new Bottleneck({
    maxConcurrent: 5,
    minTime: 600
  });
 
  const groupIdUrl = `https://${server}/ers/config/endpointgroup/${group}`;
  const groupData = await asyncRequest(generateGenericGet('GET',groupIdUrl,auth,server)).then(JSON.parse);

  function whichIsBigger (data){
    const getArrayLengths = data.map((d) => d.length).sort((a,b) => {
        return a < b;
    });
    // return the first element in the sorted array. Should be the largest number.
    return (getArrayLengths[0]);
  };
  function formatter(options, params, payload){
 
    // bar grows dynamically by current progrss - no whitespaces are added
    const bar = options.barCompleteString.substr(0, Math.round(params.progress*options.barsize));
 
    // end value reached ?
    // change color to green when finished
    if (params.value >= params.total){
        return '# ' + _colors.grey(payload.task) + '   ' + _colors.green(params.value + '/' + params.total + '/' + '100%') + ' --[' + bar + ']-- ';
    }else{
        return '# ' + payload.task + '   ' + _colors.yellow(params.value + '/' + params.total + '/' +Math.round((params.value / params.total * 100)) +'%') + ' --[' + _colors.green(bar) + ']-- ' ;
    }
  };
  const myPresets = {
    format: formatter,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    clearOnComplete: false,
  };

  

  
  const workerFunction = async (data,server,auth, options) => {
    const {name, link, authData} = data;
    const {href} = link;
    const{bar, multibar, isDone} = options;

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
    const requestData = await asyncRequest(deleteEndpointOptions(server, auth, href));
    if (isDone) multibar.stop();
    return {"DELETED" : `${name} \n${requestData}`.toUpperCase()}

  };
  const endOfArray = (data, index) => {
    // return a boolean. Have you reached the end of the array or not. 
    const lengthNormalized = data.length > 0? data.length -1 : 0;
    return (lengthNormalized === index)
  }
  // check for data in the array. If there is no data reject the request.
  if (data.cache.length == 0) {
    return new Promise((resolve,reject) => reject('\n\nAlert!!\n\n\nNothing To Delete, EPIG Is Likey Empty\n\n\n'.toUpperCase()))
  } else {
    const barMax = data.cache.length;
    const multibar = new cliProgress.MultiBar({}, myPresets);
    const bar = multibar.create(barMax, 0,{task:"Deleting EndPoints From: "+name});
    return Promise.all(data.cache.map((d, i) => limiter.schedule(() => workerFunction(d, server, auth, {bar,multibar,isDone:endOfArray(data.cache,i)}))))
  }; 
}  
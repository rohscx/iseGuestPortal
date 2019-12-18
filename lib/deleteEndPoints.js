const {asyncRequest } = require('nodeutilz'); 
const Bottleneck =  require("bottleneck");
const cliProgress = require('cli-progress');
const _colors = require('colors');


module.exports = (data) => {
  const limiter = new Bottleneck({
    maxConcurrent: 2,
    minTime: 600
  });

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

  const multibar = new cliProgress.MultiBar({}, myPresets);

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
  //   return Promise.all(allData.map((d,i) => {
  //     const name = "b"+i;
  //     const barMax = d.length;
  //     const bars = {};
  //     // text in the CLI bar. like a header
  //     const barName = "CLI Progress"+i;
  //     bars[name] = multibar.create(barMax, 0);
  //     bars[name].start(barMax,0,{task:barName});
  //     // setTimeout simulates An API request
  //     d.forEach((fE,i) => setTimeout(() => { 
  //         // inefficient and janky =?
  //         const stopCondition1 = (whichIsBigger(allData) - 1) === i;
  //         bars[name].increment();
  //         // this needs to be worked on, maybe sometime like set inverval
  //         if (stopCondition1) setTimeout(() => {
  //             multibar.stop()
  //         }, 5000);
  //     }, i*2));
  //     return bars[name];
  // }))
    return Promise.all(data.map((d,i) => {
      const name = "b"+i;
      const barMax = data.length;
      const bars = {};
      // text in the CLI bar. like a header
      const barName = "CLI Progress"+i;
      bars[name] = multibar.create(barMax, 0);
      bars[name].start(barMax,0,{task:barName});
      // setTimeout simulates An API request
      return new Promise((resolve , reject) => {
        bars[name].increment();
        resolve(limiter.schedule(() => workerFunction(d)));
      })
    }))
    // return Promise.all(data.map((d) => limiter.schedule(() => workerFunction(d))))
  }; 
}  
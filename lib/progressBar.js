const cliProgress = require('cli-progress');
const _colors = require('colors');
module.exports = function (data){

    return new Promise((resolve,reject) => {
        const myPresets = {
            format: formatter,
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
            clearOnComplete: false,
          };
        function formatter(options, params, payload){
    
            // bar grows dynamically by current progrss - no whitespaces are added
            const bar = options.barCompleteString.substr(0, Math.round(params.progress*options.barsize));
            
            // end value reached ?
            // change color to green when finished
            if (params.value >= params.total){
                return '# ' + _colors.grey(payload.task) + '   ' + _colors.green(params.value + '/' + params.total + '/' + '100%') + ' --[' + bar + ']-- ';
            } else {
                return '# ' + payload.task + '   ' + _colors.yellow(params.value + '/' + params.total + '/' +Math.round((params.value / params.total * 100)) +'%') + ' --[' + _colors.green(bar) + ']-- ' ;
            }
        }; 
    
        function whichIsBigger (data){
            const sorted = data.map((d) => d.cache.length).sort((a,b) => a - b);
            const lastItem =sorted.slice(-1)[0];
            // return the first element in the sorted array. Should be the largest number.
            return (lastItem);
        };


        const multibar = new cliProgress.MultiBar({}, myPresets);
        if (Array.isArray(data)) {
            const newData = data.map((d) => ({...d,multibar,largestLength:whichIsBigger(data),barMax:d.cache.length}));
            resolve(newData);
        } else {
            const paddedNewData = {...data,multibar,largestLength:whichIsBigger([data]),barMax:data.cache.length};
            resolve(paddedNewData)
        }
    })
    //const bar = multibar.create(barMax, 0,{task:"Deleting EndPoints From: "+name});
}
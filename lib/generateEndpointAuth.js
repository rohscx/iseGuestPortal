module.exports = function (method,groupId,auth,iseServer){
    return  {
        method,
        'url': `https://${iseServer}/ers/config/endpoint?filter=groupId.EQ.${groupId}`,
        'headers': {
          'Accept': 'application/json',
          'Authorization':auth,
          'Cache-Control': 'no-cache',
          'Host':iseServer,
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive'
        }
      };
}
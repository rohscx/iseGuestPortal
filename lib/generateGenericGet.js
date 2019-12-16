module.exports = function (method,url,auth,iseServer){
    return  {
        method,
        'url': url,
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
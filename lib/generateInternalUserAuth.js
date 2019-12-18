module.exports = function (method,userId,auth,iseServer,uName,uPassword){
    return  {
        method,
        'url': `https://${iseServer}/ers/config/internaluser/${userId}`,
        'headers': {
          'Accept': 'application/json',
          'Authorization':auth,
          'Cache-Control': 'no-cache',
          'Host':iseServer,
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
        },
        'body': {
          "InternalUser": {
              "description":`Updated on: ${new Date()}`,
              "id": userId,
              "name": uName,
              "enabled": true,
              "password": uPassword,
              "changePassword": false
          }
      },
      'json':true
      };
}
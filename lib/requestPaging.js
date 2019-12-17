const {asyncRequest } = require('nodeutilz'); 


// only cool because it uses an Async Iterator....
module.exports = async function (data) {
    return new Promise((resolve,reject) => {
        
        const {total, resources, nextPage } = data.SearchResult;
        const resourcesExist = resources.length > 0;
        if (!resourcesExist) return resolve({cache:resources,name:data.authData.name,authData:data.authData});
        if (!nextPage) return resolve({cache:resources,name:data.authData.name,authData:data.authData});
        const {rel, href} = nextPage;
        const {server, auth, group,name} = data.authData;

        const generateOptions = (server, auth, page) => {
            return {
                'method': 'GET',
                'url': page,
                'headers': {
                  'Accept': 'application/json',
                  'Authorization': auth,
                  'User-Agent': 'custom APP',
                  'Cache-Control': 'no-cache',
                  'Host': server,
                  'Accept-Encoding': 'gzip, deflate',
                  'Connection': 'keep-alive'
                }
              };
        }

       
        
        const endpoints = {
          [Symbol.iterator]: function (){
            let nextPage = href;
            return {
              next: async function (){
               
                const request = await asyncRequest(generateOptions(server, auth, nextPage));
                const asJson = JSON.parse(request);
                if (!asJson.SearchResult.nextPage) {
                  //console.log(nextPage)
                  return { 
                    value: asJson,
                    done: true 
                  }
                }

                nextPage = asJson.SearchResult.nextPage.href;
                //console.log(nextPage)
                return {
                  value: asJson,
                  done: false
                }
              }
            }
          }
        };
        
        const cache = [...resources];
        ;( async function () {
          const iterator =  endpoints[Symbol.iterator]()
          const iteratorData = await iterator.next()
          //console.log(iteratorData)
          iteratorData.value.SearchResult.resources.map((d) => cache.push(d));
          
          while (!iteratorData.done) {
            const  moreIteratorData = await iterator.next();
            moreIteratorData.value.SearchResult.resources.map((d) => cache.push(d));
            if (moreIteratorData.done) return resolve({name,cache,authData:data.authData})
          }
    
          return resolve({name,cache,authData:data.authData})
        })()

        // ;(async function () {
        //   for await (let endpoint of endpoints) {
        //     console.log(endpoints)
            
        //     //data.SearchResult.resources.map((d) => cache.push(d));
        //   }
          
        // })()
        // /resolve(cache)
        
        
        // (async function () {
        //     let starter = rel;
        //     let page = href;
        //     while(starter == 'next') { 
        //       const pageData = await asyncRequest(generateOptions(page));
        //       const asJson = JSON.parse(pageData);
        //       asJson.SearchResult.resources.map((d) => allResources.push(d))
        //       starter = asJson.SearchResult.nextPage ? 'next' : 'done';
        //       page = asJson.SearchResult.nextPage ? asJson.SearchResult.nextPage.href : 'done';
        //       if (!asJson.SearchResult.nextPage) return resolve(allResources);
        //     }
        //   })()
    })
}
module.exports = function (data){
    return new Promise ((resolve,reject) => {
        try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
        } catch (error) {
            reject(data);
        }
    })
}
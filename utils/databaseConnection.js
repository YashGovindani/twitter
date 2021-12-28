// imports
const mysql = require('mysql2/promise');
const configs = require('../configs.json').mysql;

// to get connection
module.exports =  async function()
{
    return new Promise(async (resolve, reject)=>{
        try
        {
            connection = await mysql.createConnection(configs);
            resolve(connection);
        }catch(error)
        {
            reject(error);
        }
    });
}
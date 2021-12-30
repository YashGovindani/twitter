// imports
const getConnection = require('../utils/databaseConnection');

module.exports.add = async function(jsonObject)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            response = await connection.execute('INSERT INTO tweet (data, upload_date, upload_time, user_id) VALUES (?,CURRENT_DATE(),CURRENT_TIME(),?)', [jsonObject.data, jsonObject.userId]);
            await connection.close();
            resolve();
        }catch(error){
            reject(error);
        }
    });
}

module.exports.getForUserId = async function(userId)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            response = await connection.execute('SELECT * FROM tweet WHERE user_id IN (SELECT following_user_id FROM follow_mapping WHERE follower_user_id=?) order by upload_date, upload_time DESC', [userId]);
            await connection.close();
            resolve(response[0]);
        }catch(error){
            reject(error);
        }
    });
}
// imports
const getConnection = require('../utils/databaseConnection');

module.exports.userExistsByUserId = async function(userId)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            response = await connection.execute('select user_id from user where user_id = ? limit 1', [userId]);
            await connection.close();
            resolve(response[0].length != 0);
        }catch(error){
            reject(error);
        }
    });
}

module.exports.userExistsByEmail = async function(emailString)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            response = await connection.execute('select email from user where email = ? limit 1', [emailString]);
            await connection.close();
            resolve(response[0].length != 0);
        }catch(error){
            reject(error);
        }
    });
}

module.exports.userExistsByUsername = async function(usernameString)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            response = await connection.execute('select username from user where username = ? limit 1', [usernameString]);
            await connection.close();
            resolve(response[0].length != 0);

        }catch(error){
            reject(error);
        }
    });
}

module.exports.add = async function(user)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            await connection.execute('insert into user (name, email, username, password) values (?,?,?,?)', [user.name, user.email, user.username, user.password]);
            await connection.end();
            resolve();
        }catch(error){
            reject(error);
        }
    });
}

module.exports.getByEmail = async function(emailString)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            response = await connection.execute('select * from user where email=?', [emailString]);
            await connection.close();
            resolve(response[0][0]);
        }catch(error){
            reject(error);
        }
    });
}

module.exports.getByUsername = async function(username)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            response = await connection.execute('select * from user where username=?', [username]);
            await connection.close();
            resolve(response[0][0]);
        }catch(error){
            reject(error);
        }
    });
}

module.exports.isFollowing = async function(jsonObject)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            response = await connection.execute('select follower_user_id from follow_mapping where follower_user_id=? and following_user_id=? limit 1', [jsonObject.followerUserId, jsonObject.followingUserId]);
            await connection.close();
            resolve(response[0].length != 0);
        }catch(error){
            reject(error);
        }
    });
}

//follower with follower_user_if -> is following to
module.exports.follow = async function(jsonObject)
{
    return new Promise(async (resolve, reject) => {
        try
        {
            connection = await getConnection();
            await connection.execute('insert into follow_mapping (follower_user_id, following_user_id) values (?,?)', [jsonObject.followerUserId, jsonObject.followingUserId]);
            await connection.end();
            resolve();
        }catch(error){
            reject(error);
        }
    });
}
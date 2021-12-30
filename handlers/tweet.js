// imports
const Boom = require('@hapi/boom');
const tweetModel = require('../models/tweet');
const userModel = require('../models/user');

module.exports.add = async function(request, h){
    try
    {
        if(h.loginCheck(request, h) == false) return Boom.forbidden();
        let data = request.payload.data;
        if(data == undefined || data.length == 0) return Boom.badRequest('Data is required');
        if(data.length > 140) return Boom.badRequest('Length of tweet can not exceed 140 characters');
        let userId = request.payload.userId;
        if(userId == undefined) return Boom.badRequest('User Id required');
        if(await userModel.userExistsByUserId(userId) == false) return Boom.badRequest('Invalid userId');
        await tweetModel.add({data, userId});
        return {
            status : true,
            message : "Tweeted"
        };
    }catch(error){
        console.log(error);
        return Boom.badImplementation();
    }
};

module.exports.getTweetsForUserId = async function(request, h){
    try
    {
        if(h.loginCheck(request, h) == false) return Boom.forbidden();
        let userId = request.payload.userId;
        if(userId == undefined) return Boom.badRequest("User Id required");
        if(await userModel.userExistsByUserId(userId) == false) return Boom.badRequest('Invalid user id');
        let response = await tweetModel.getForUserId(userId);
        return {
            status : true,
            message : response
        }; 
    }catch(error){
        console.log(error);
        return Boom.badImplementation();
    }
};
// imports
const Boom = require('@hapi/boom');
const userModel = require('../models/user');

module.exports.signUp = async function(request, h){
    try
    {
        let name = request.payload.name;
        if(name == undefined || name.length == 0) return Boom.badRequest('Name required');
        let email = request.payload.email;
        if(email == undefined || email.length <= 4 || email.indexOf('@') == -1) return Boom.badRequest('Provide a valid email');
        if(await userModel.userExistsByEmail(email)) return Boom.badRequest('User exists with email : ' + email);
        let username = request.payload.username;
        if(username == undefined || username.length == 0) return Boom.badRequest('Username required');
        if(await userModel.userExistsByUsername(username)) return Boom.badRequest('Username : ' + username + ' is not available');
        let password = request.payload.password;
        if(password == undefined) return Boom.badRequest('Password required');
        if(password.length < 8) return Boom.badRequest('Minimum length of password is 8');
        await userModel.add({name, email, username, password});
        return {
            status : true,
            message : 'User signed up'
        };
    }catch(error){
        console.log(error);
        return Boom.badImplementation();
    }
};

module.exports.loginByEmail = async function(request, h){
    try
    {
        let email = request.payload.email;
        if(email == undefined || email.length <= 4 || email.indexOf('@') == -1) return Boom.badRequest("Invalid email");
        if(await userModel.userExistsByEmail(email) == false) return Boom.badRequest("User does not exist with email : " + email);
        let password = request.payload.password;
        if(password == undefined || password.length < 8) return Boom.badRequest("Invalid password");
        let userObject = await userModel.getByEmail(email);
        require('../container.json')[userObject.user_id] = 1;
        return {
            status : true,
            message : "logged in"
        };
    }catch(error){ 
        console.log(error);
        return Boom.badImplementation();
    }
};

module.exports.follow = async function(request, h){
    try
    {
        if(h.loginCheck(request, h) == false) return Boom.forbidden();
        let followerUserId = request.payload.followerUserId;
        if(followerUserId == undefined) return Boom.badRequest('Follower user id required');
        if(await userModel.userExistsByUserId(followerUserId) == false) return Boom.badRequest('Invalid follower user id');
        let followingUserId = request.payload.followingUserId;
        if(followingUserId == undefined) return Boom.badRequest('Following user id required');
        if(await userModel.userExistsByUserId(followingUserId) == false) return Boom.badRequest('Invalid following user id');
        if(await userModel.isFollowing({followerUserId, followingUserId})) return Boom.badRequest('Already following');
        await userModel.follow({followerUserId, followingUserId});
        return {
            status : true,
            message : 'Followed'
        };
    }catch(error){
        console.log(error);
        return Boom.badImplementation();
    }
};
const handlers = require('../handlers/user');

module.exports = [
    {
        method : 'POST',
        path : '/signup',
        handler : handlers.signUp
    },
    {
        method : 'POST',
        path : '/follow',
        handler : handlers.follow
    },
    {
        method : 'POST',
        path : '/loginByEmail',
        handler : handlers.loginByEmail
    }
]
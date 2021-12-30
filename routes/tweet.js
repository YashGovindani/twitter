const handlers = require('../handlers/tweet');

module.exports = [
    {
        method : 'POST',
        path : '/tweet',
        handler : handlers.add
    },
    {
        method : 'POST',
        path : '/feeds',
        handler : handlers.getTweetsForUserId
    },
]
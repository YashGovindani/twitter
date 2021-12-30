// imports
const Hapi = require('@hapi/hapi');
const configs = require('./configs.json');

// entry point function
const init = async () => {
    // creating server
    const server = Hapi.server(configs.server);

    // plugin
    const loginChecker = {
        name: 'loginCheck',
        version: '1.0.0',
        register: async function (server, options) {
    
            const pluginHandler = function(request, h) {
                let userId = request.raw.req.headers.userid;
                return userId != undefined && require('./container.json')[userId] != undefined;
            };
            server.decorate('toolkit', 'loginCheck', pluginHandler);
        }
    };
    await server.register({
        plugin: loginChecker
    });

    // adding routes
    server.route(require('./routes/user'));
    server.route(require('./routes/tweet'));

    // starting server
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// for unhandled rejections
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// entry point
init();
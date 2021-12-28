// imports
const Hapi = require('@hapi/hapi');
const configs = require('./configs.json');

// entry point function
const init = async () => {
    // creating server
    const server = Hapi.server(configs.server);

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
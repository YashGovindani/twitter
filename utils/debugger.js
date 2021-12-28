//imports
const debugEnabled = require("../configs.json").debugEnabled;

module.exports = function debug(message)
{
    if(debugEnabled) console.log(message);
}
var log4js = require('log4js');

module.exports = {
    config : {
        appenders: {
            gonnetLogger: { type: 'file', filename: 'gonnetLogger.log' }
            },
        categories: {
            default: {
                appenders: ['gonnetLogger'],
                level: 'info'
            }
        }
    },
    initialize : function () {
        log4js.configure(this.config);
    },
    getLogger : function (logger) {
        return log4js.getLogger(logger);
    }
    
};
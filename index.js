var bcp47 = require('bcp47');
var debug = require('debuglog')('express-bcp47');

module.exports = function (options) {
    options = options || {};

    if (!bcp47.parse(options.defaultLocale)) {
        throw new Error('default locale "' + options.defaultLocale + '" can\'t be parsed');
    }

    return function handlebcp47(req, res, next) {
        debug("trying accept-language header %j", req.headers['accept-language']);
        if ((res.locals.locale = req.locale = bcp47.parse(req.headers['accept-language']))) {
            debug("locale selected from accept-language header is '%j'", req.locale);
        } else {
            debug("using default locale '%s'", options.defaultLocale);
            res.locals.locale = req.locale = bcp47.parse(options.defaultLocale);
        }

        if (options.vary) {
            debug("signalling that we vary our output based on the accept-language header for caching purposes");
            res.setHeader('vary', 'accept-language');
        }

        next();
    };
};

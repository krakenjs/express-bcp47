var bcp47 = require('bcp47');

module.exports = function (options) {
    options = options || {};

    if (!bcp47.parse(options.defaultLocale)) {
        throw new Error('default locale "' + options.defaultLocale + '" can\'t be parsed');
    }

    return function handlebcp47(req, res, next) {
        if (!(res.locals.locale = req.locale = bcp47.parse(req.headers['accept-language']))) {
            res.locals.locale = req.locale = bcp47.parse(options.defaultLocale);
        }

        if (options.vary) {
            res.setHeader('vary', 'accept-language');
        }

        next();
    };
};

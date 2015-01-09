var bcp47 = require('bcp47');

module.exports = function (options) {
    options = options || {};

    if (!bcp47.parse(options.defaultLocale)) {
        throw new Error('default locale "' + options.defaultLocale + '" can\'t be parsed');
    }

    return function handlebcp47(req, res, next) {
        res.locals.context = res.locals.context || {};

        if (!(res.locals.context.locale = req.locale = bcp47.parse(req.headers['accept-language']))) {
            res.locals.context.locale = req.locale = bcp47.parse(options.defaultLocale);
        }

        if (options.vary) {
            res.setHeader('vary', 'accept-language');
        }

        next();
    };
};

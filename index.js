"use strict";
var bcp47 = require('bcp47');
var debug = require('debuglog')('express-bcp47');
var Negotiator = require('negotiator');

module.exports = function (options) {
    options = options || {};

    if (!bcp47.parse(options.defaultLocale)) {
        throw new Error('default locale "' + options.defaultLocale + '" can\'t be parsed');
    }

    return function handlebcp47(req, res, next) {
        var negotiator = new Negotiator(req);
        debug("trying accept-language header %j", req.headers['accept-language']);
        var selected = negotiator.languages(options.availableLocales).filter(function (l) {
            debug("trying '%s'", l);
            return bcp47.parse(l);
        });

        if ((res.locals.locale = req.locale = bcp47.parse(selected))) {
            debug("locale selected from accept-language header is '%s'", selected);
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

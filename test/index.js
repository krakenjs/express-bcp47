"use strict";

var test = require('tap').test;
var express = require('express');

var Req = require('mock-req');
var Res = require('mock-res');

var mw = require('../index.js');


test('test that the middleware uses the supplied header', function (t) {
    var app = express();
    app.use(mw({defaultLocale: 'fr-FR'}));

    var req = new Req({method: 'GET', url: '/', headers: {'accept-language': 'en-US'} });
    var res = new Res();
    app(req, res, function () {
        t.ok(req.locale);
        t.equal(req.locale.langtag.language.language, 'en');
        t.equal(req.locale.langtag.region, 'US');
        t.equal(req.locale, res.locals.locale);
        t.end();
    });
});

test('test that the middleware uses the default if not specified', function (t) {
    var app = express();
    app.use(mw({defaultLocale: 'fr-FR'}));

    var req = new Req({method: 'GET', url: '/'});
    var res = new Res();
    app(req, res, function () {
        t.ok(req.locale);
        t.equal(req.locale.langtag.language.language, 'fr');
        t.equal(req.locale.langtag.region, 'FR');
        t.equal(req.locale, res.locals.locale);
        t.end();
    });
});

test('test that the middleware uses the list of available locales', function (t) {
    var app = express();
    app.use(mw({defaultLocale: 'es-MX', availableLocales: [ 'fr', 'en-US' ]}));

    var req = new Req({method: 'GET', url: '/', headers: {'accept-language': 'fr-FR'} });
    var res = new Res();
    app(req, res, function () {
        t.ok(req.locale);
        t.equal(req.locale.langtag.language.language, 'fr');
        t.notOk(req.locale.langtag.region);
        t.equal(req.locale, res.locals.locale);
        t.end();
    });
});

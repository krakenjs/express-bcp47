var test = require('tape');
var express = require('express');

var Req = require('mock-req');
var Res = require('mock-res');

var mw = require('../index.js');

var app = express();
app.use(mw({defaultLocale: 'fr-FR'}));

test('test that the middleware uses the supplied header', function (t) {
    var req = new Req({method: 'GET', url: '/', headers: {'accept-language': 'en-US'} });
    var res = new Res();
    app(req, res, function () {
        t.ok(req.locale);
        t.equal(req.locale.langtag.language.language, 'en');
        t.equal(req.locale.langtag.region, 'US');
        t.end();
    });
});

test('test that the middleware uses the default if not specified', function (t) {
    var req = new Req({method: 'GET', url: '/'});
    var res = new Res();
    app(req, res, function () {
        t.ok(req.locale);
        t.equal(req.locale.langtag.language.language, 'fr');
        t.equal(req.locale.langtag.region, 'FR');
        t.end();
    });
});

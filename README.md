express-bcp47 -- middleware for parsing locale from headers
===========================================================

## SYNOPSIS

    var bcp47mw = require('express-bcp47');
    app.use(bcp47mw({ defaultLocale: "en-US", vary: true }));

## DESCRIPTION

`express-bcp47` is a simple middleware that parses the `Accept-Language` header from the browser and exposes it to handlers under `req.locale` (for handlers) and `res.locals.locale` (for the view layer)

There are two parameters to the options object used in the constructor:

* `defaultLocale`, a string in `bcp47` format for the locale to use when the browser does not send one
* `vary`, a boolean (defaults to false) that has the middleware send back the `Vary: Accept-Language` header, to signal that content for this resource varies depending on that header, improving cacheability. Turn this on if you don't set the `Vary` header yourself dependent on other values like `Cookie` or `Accept-Type` in addition to `Accept-Language`

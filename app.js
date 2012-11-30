'use strict';
var express = require('express'),
    app = express();
    app.use(express.static(__dirname + '/public')); 
    console.log('Express service listening on port %d, environment: %s', app.listen(5555).address().port, app.settings.env);

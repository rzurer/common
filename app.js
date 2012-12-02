'use strict';
var local = false,
	application,
	express = require('express'),
	app = express();
app.use(express.static(__dirname + '/public'));
application = app.listen(5555);
if (local) {
    console.log('Express service listening on port %d, environment: %s', application.address().port, app.settings.env);
}
var utils = require("utils");

casper.options.pageSettings = {
	userName: 'http.auth.user',
	password: 'http.auth.pwd'
};
casper.userAgent('Firefox/5.0 (Macintosh; Intel Mac OS X)');
casper.options.verbose = true;

var errors = [];

// detect js errors on pages:
casper.on("page.error", function(msg, trace) {
	casper.log("Error:    " + msg, "error");
	casper.log("file:     " + trace[0].file, "warning");
	casper.log("line:     " + trace[0].line, "warning");
	casper.log("function: " + trace[0]["function"], "warning");
	errors.push(msg);
});

var started = false;
casper.on("started", function() {
	started = true;
});

// capture screenshot upon test failures:
casper.test.on("fail", function(failure) {
	if (started) {
		casper.capture(failure.file + '@' + failure.line + '.png');
	}
});

// show 404s as error
casper.on('http.status.404', function(resource) {
	casper.log('not found: ' + resource.url, "error");
});

// show 500s as error
casper.on('http.status.500', function(resource) {
	casper.log('whoops, 500 error: ' + resource.url, "error");
});

casper.on('resource.received', function(resource) {
	casper.log(resource.url, "debug");
});
casper.on('resource.requested', function(resource) {
	casper.log(resource.url, "debug");
	/*
	// debugging: print headers:
	for (var obj in resource.headers) {
		var name = resource.headers[obj].name;
		var value = resource.headers[obj].value;
		if (name == "User-Agent"){
			casper.log(value, "debug");
		}
	}
	*/
});

// fail tests if page errors occured:
casper.on("run.complete", function() {
	if (errors.length > 0) {
		var msg = errors.length + ' javascript errors found';
		this.log(msg, "warning");
		this.test.uncaughtError(msg, this.test.currentTestFile);
	} else {
		this.log(errors.length + ' javascript errors found', "info");
	}
});

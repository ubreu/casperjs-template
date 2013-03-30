testhost = casper.cli.get("testhost");
casper.echo("using testhost: " + testhost, "debug");
casper.setFilter('open.location', function(location) {
	"use strict";
	if (/^file/.test(location)) {
		return location;
	}
	if (!/^http/.test(location)) {
		return utils.format('%s/%s', testhost, location);
	}
	return location;
});

casper.test.done();

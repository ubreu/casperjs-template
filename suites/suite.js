casper.test.begin("page found", 2, function suite(test) {
	casper.start("/", function() {
		test.assertTitle("GitHub · Build software better, together.", "on github page");
		test.assertExists("li.search a", "found search link");
	});
});

casper.run(function() {
	casper.test.done();
});

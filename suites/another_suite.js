casper.test.begin("can search", 2, function suite(test) {
	casper.start('/', function() {
		test.assertTitle("GitHub · Build software better, together.", "on github page");
	});
	casper.then(function clickButton() {
     		this.click('li.search a');
	});

	casper.then(function() {
		this.waitForResource("/search", function() {
    		this.test.assertTitle('Code Search · GitHub');
  		},function() {
  		},5000);
	});
});

casper.run(function() {
	casper.test.done();
});

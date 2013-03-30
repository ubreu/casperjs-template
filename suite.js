casper.test.begin("user can log in", 3, function suite(test) {
	casper.start("/", function() {
		test.assertTitle("foo page title", "on foo login page");
		test.assertExists("#login_form", "found login form");
		this.fill("#login-form", {
			email: "test@foo.org",
			password: "password"
		}, false);
	});
	casper.then(function clickButton() {
		this.click("#login");
	});

	casper.then(function() {
		this.waitForResource(testhost + "/protected", function() {
		this.test.assertTitle("foo protected page title", "on foo protected page");
	},function() {
		// nop
	},5000);
});

	casper.run(function() {
		casper.test.done();
	});
});

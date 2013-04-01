#!/bin/sh
casperjs test --pre=pre.js --includes=common.js --testhost=http://github.com --log-level=debug suites

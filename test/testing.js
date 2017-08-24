/* global describe, it, before */

var server = require('../server.js');
var assert = require('chai').assert;

describe('server', function () {
  before(function () {
    server.listen(8080);
  });

  after(function () {
    server.close();
  });
});
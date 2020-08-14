const lib = require('./index');
const expect = require('chai').expect;

describe('My lib Test', function () {
    it('should return sum of 2 Numbers', function () {
        const result = lib.sum(1, 2);
        expect(result).to.eq(3);
    });
});
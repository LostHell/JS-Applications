const lib = require('./Sum of Numbers');
const expect = require('chai').expect;

describe('Test sum of numbers', function () {
    it('should return sum of numbers. Sum are equal 6', function () {
        const result = lib.sum([1, 2, 3]);
        expect(result).to.eq(6);
    });
});
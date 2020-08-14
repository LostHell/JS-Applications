const lib = require('./Even or Odd');
const expect = require('chai').expect;

describe('Test Odd or Even is string length', function () {
    it('should be undefined with numbers parameters', function () {
        const result = lib.oddOrEven(150);
        expect(result).to.eq(undefined);
    });
    it('should be undefined with arrays parameters', function () {
        const result = lib.oddOrEven(['1', 'a']);
        expect(result).to.eq(undefined);
    });
    it('should be undefined with objects parameters', function () {
        const result = lib.oddOrEven({name: 'Georgi', lastName: 'Ivanov'});
        expect(result).to.eq(undefined);
    });
    it('should be valid string and odd', function () {
        const result = lib.oddOrEven('Train');
        expect(result).to.eq('odd');
    });
    it('should be valid string and even', function () {
        const result = lib.oddOrEven('Love');
        expect(result).to.eq('even');
    });
});
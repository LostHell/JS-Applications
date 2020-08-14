const lib = require('./Char Lookup');
const expect = require('chai').expect;

describe('Test Lookup char', function () {
    it('should return undefined with a non string first parameter', function () {
        expect(lib.lookupChar(13, 0)).to.eq(undefined,
            'This function did not return the correct result');
    });
    it('should return undefined with a non string second parameter', function () {
        expect(lib.lookupChar('Ivan', 'Marin')).to.eq(undefined,
            'This function did not return the correct result');
    });
    it('should return Incorrect index ,becouse index is out of string range', function () {
        expect(lib.lookupChar('Ivan', 15)).to.eq('Incorrect index',
            'This function did not return the correct result');
    });
    it('should return correct result', function () {
        expect(lib.lookupChar('Ivan', 0)).to.eq('I',
            'This function return the correct result');
    });
});
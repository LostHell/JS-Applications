const lib = require('./RGB to Hex');
const expect = require('chai').expect;

describe('Test RGB To HEX', function () {
    it('should be invalid all inputs', function () {
        const minValue = -10;
        const maxValue = 260;
        const text = 'da';
        const result = lib.RGB(minValue, maxValue, text);
        expect(result).to.eq(undefined);
    });
    it('should be invalid 2 inputs', function () {
        const minValue = 10;
        const maxValue = 260;
        const text = 'da';
        const result = lib.RGB(minValue, maxValue, text);
        expect(result).to.eq(undefined);
    });
    it('should be invalid 1 input', function () {
        const minValue = 20;
        const maxValue = 60;
        const text = 'da';
        const result = lib.RGB(minValue, maxValue, text);
        expect(result).to.eq(undefined);
    });
    it('should be valid all inputs', function () {
        const minValue = 45;
        const maxValue = 160;
        const text = 122;
        const result = lib.RGB(minValue, maxValue, text);
        expect(result).to.eq('#2DA07A');
    });
});
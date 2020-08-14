const lib = require('./Add and Subtract');
const expect = require('chai').expect;

describe('Test calculator result', function () {
    it('should be 0', function () {
        const result = lib.calculator().get();
        expect(result).to.eq(0);
    });
    it('should be 10', function () {
        const calc = lib.calculator();
        calc.add(10);
        const result = calc.get();

        expect(result).to.eq(10);
    });
    it('should be 5', function () {
        const calc = lib.calculator();
        calc.add(10);
        calc.subtract(5);
        const result = calc.get();

        expect(result).to.eq(5);
    });
});
const lib = require('./Math Enforcer');
const expect = require('chai').expect;

describe('Test Math Enforcer', function () {
    describe('addFive', function () {
        it('should return correct result with a number parameter', function () {
            expect(lib.mathEnforcer.addFive(5)).to.eq(10);
        });
        it('should return undefined without parameter', function () {
            expect(lib.mathEnforcer.addFive()).to.eq(undefined);
        });
        it('should return undefined with a string parameter', function () {
            expect(lib.mathEnforcer.addFive('5')).to.eq(undefined);
        });
        it('should return undefined with a array parameter', function () {
            expect(lib.mathEnforcer.addFive([1])).to.eq(undefined);
        });
        it('should return undefined with a object parameter', function () {
            expect(lib.mathEnforcer.addFive({num: 5})).to.eq(undefined);
        });
    });
    describe('subtractTen', function () {
        it('should return correct result with a number parameter', function () {
            expect(lib.mathEnforcer.subtractTen(10)).to.eq(0);
        });
        it('should return undefined without parameter', function () {
            expect(lib.mathEnforcer.subtractTen()).to.eq(undefined);
        });
        it('should return undefined with a string parameter', function () {
            expect(lib.mathEnforcer.subtractTen('5')).to.eq(undefined);
        });
        it('should return undefined with a array parameter', function () {
            expect(lib.mathEnforcer.subtractTen([1])).to.eq(undefined);
        });
        it('should return undefined with a object parameter', function () {
            expect(lib.mathEnforcer.subtractTen({num: 5})).to.eq(undefined);
        });
    });
    describe('sum', function () {
        it('should return correct result with a number parameter', function () {
            expect(lib.mathEnforcer.sum(10, 10)).to.eq(20);
        });
        it('should return undefined without parameter', function () {
            expect(lib.mathEnforcer.sum()).to.eq(undefined);
        });
        it('should return undefined with a string parameter', function () {
            expect(lib.mathEnforcer.sum('5', '5')).to.eq(undefined);
        });
        it('should return undefined with a array parameter', function () {
            expect(lib.mathEnforcer.sum([1], [2])).to.eq(undefined);
        });
        it('should return undefined with a object parameter', function () {
            expect(lib.mathEnforcer.sum({num1: 5}, {num2: 5})).to.eq(undefined);
        });
    });
});
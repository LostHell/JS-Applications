const lib = require('./Check for Symmetry');
const exprect = require('chai').expect;

describe('Test check symmetry', function () {
    it('should be not array', function () {
        let input = 'a';
        const result = lib.isSymmetric(input);
        exprect(result).to.eq(false);
    });
    it('should be symmetric array', function () {
        let input = [1, 1];
        const result = lib.isSymmetric(input);
        exprect(result).to.eq(true);
    });
    it('should be NOT symmetric array', function () {
        let input = [1, 2];
        const result = lib.isSymmetric(input);
        exprect(result).to.eq(false);
    });
});
const PaymentPackage = require('./Payment Package');
const expect = require('chai').expect;

describe('Test class Payment Package', function () {
    it('should return valid data', function () {
        const payment = new PaymentPackage.PaymentPackage('Motivation', 25);
        const result = payment.toString();
        expect(result).to.eq(`Package: Motivation\n- Value (excl. VAT): 25\n- Value (VAT 20%): 30`);
    });
    it('should be throw name exception', function () {
        expect(() => new PaymentPackage.PaymentPackage('',25)).to.throw;
    });
    it('should be throw value exception', function () {
        expect(() => new PaymentPackage.PaymentPackage('Motivation',-25)).to.throw;
    });

});
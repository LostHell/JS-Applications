const lib = require('./String Builder');
const expect = require('chai').expect;

describe('Test class String Builder', function () {
    describe('constructor', function () {
        it('should return valid result with constructor input and append input', function () {
            const constructorInput = 'Dimo';
            const firsInputAppend = ', you are crazy!';
            const str = new lib.StringBulder(constructorInput);
            str.append(firsInputAppend);
            expect(str.toString()).to.eq('Dimo, you are crazy!');
        });
    });
    describe('prepend', function () {
        it('should return valid prepend result', function () {
            const prepend = 'Hey ';
            const constructorInput = 'Dimo';
            const firsInputAppend = ', you are crazy!';
            const str = new lib.StringBulder(constructorInput);
            str.prepend(prepend);
            str.append(firsInputAppend);
            expect(str.toString()).to.eq('Hey Dimo, you are crazy!');
        });
    });
    describe('indertAt', function () {
        it('should return valid insert result', function () {
            const prepend = 'Hey ';
            const insertData = ['so ', 18];
            const constructorInput = 'Dimo';
            const firsInputAppend = ', you are crazy!';
            const str = new lib.StringBulder(constructorInput);
            str.prepend(prepend);
            str.append(firsInputAppend);
            str.insertAt(insertData[0], Number(insertData[1]));
            expect(str.toString()).to.eq('Hey Dimo, you are so crazy!');
        });
    });
    describe('remove', function () {
        it('should return valid remove result', function () {
            const prepend = 'Hey ';
            const insertData = ['so ', 18];
            const constructorInput = 'Dimo';
            const firsInputAppend = ', you are crazy!';
            const str = new lib.StringBulder(constructorInput);
            str.prepend(prepend);
            str.append(firsInputAppend);
            str.insertAt(insertData[0], Number(insertData[1]));
            str.remove(0, 4)
            expect(str.toString()).to.eq('Dimo, you are so crazy!');
        });
    });
});
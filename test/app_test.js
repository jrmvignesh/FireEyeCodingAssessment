/**
 * Created by Ramkumar on 8/17/2017.
 */

'use strict';
const assert = require('chai').assert;
const app = require('../src/app.js');
var addNumbersResult = app.GeneratePrimeNumbers(100);




describe('App' , function(){
    it('Test should return array length' , function () {
         assert.equal(addNumbersResult.length,25);
    });

    it('Test should Mean and Average' , function () {
        let getSumAndAvg = app.calcSumAvg(2,95,addNumbersResult);
        assert.equal(getSumAndAvg.sum,963);
        assert.equal(getSumAndAvg.mean,40.125);
    });
});








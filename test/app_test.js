/**
 * Created by Ramkumar on 8/17/2017.
 */

var chai = require('chai');
var expect = chai.expect;
var server = require('C:/Users/Ramkumar/WebstormProjects/FireEye/src/app.js');
var assert = require('assert');

describe('server' , function(){
    it('should return an array for positive integer' , function () {

        var result = GeneratePrimeNumbers(100);

        var minBound = result[0];
        var maxBound = result[result.length-1];
        var expectedMin = 2;
        var expectedMax = 97;

        assert.equal(minBound, expectedMin);
        assert.equal(maxBound, expectedMax);



    });
});







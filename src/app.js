/**
 * Created by Ramkumar on 8/17/2017.
 */

var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1', {no_ready_check: true});
var prompt = require('prompt');

client.auth('password', function (err) {
    if (err) throw err;
});

client.on('connect', function() {
    console.log('Connected to Redis');
});

client.flushdb( function (err, succeeded) {
    console.log(succeeded);
});

var prev = 0; var sum =0;

/*module.exports = {
    sayHello: function(){
        return 'hello';
    },
    addNumbers: function(value1, value2){
        return value1 + value2;
    }
}*/



function GeneratePrimeNumbers(integer) {

    if(integer <= 1)
        return 0;
    var arr = [];
    for(var i = 2 ; i < integer; i++)
    {
        if(arr[i] == undefined)
        {
            arr[i] = true;
            client.rpush('myList', i);
            prev = i;
            sum+=prev;
            client.rpush('sumList', sum);

        for(var j =2; i*j < integer; j++)
            arr[i*j] = false;

        }
    }

    var numList = [];
    client.lrange('myList', 0, -1, function (error, items) {
        if (error) throw error
        items.forEach(function (item) {
            numList.push(Number(item));
        })
    })

    return numList;
}

var numList = GeneratePrimeNumbers(Number(process.argv.slice(2)));

console.log(numList[0] + " --> " + numList[numList.length-1]);

var sumList = [];

client.lrange('sumList', 0, -1, function (error, items) {
    if (error) throw error
    items.forEach(function (item) {
        sumList.push(Number(item));
    })
        console.log("Number List "+numList.toString());
        console.log("Sum List "+sumList.toString());
    calcMean(numList);
})

function calcMean(arr) {
    prompt.start();

    console.log('\nEnter 1 to continue, 2 to exit');


    prompt.get(['option'], function (err, result) {

        if (result.option == 2)
            process.exit();
        else if (result.option == 1) {
            prompt.get(['lowerBound', 'upperBound'], function (err, result) {
                var result = calcSumAvg(result.lowerBound, result.upperBound, arr);
                console.log("Result Object : " + JSON.stringify(result));
                if (result instanceof Object || result == undefined)
                    calcMean(arr);
            });
        }
        else
        {
            console.log("You have entered a wrong option");
            calcMean(arr)

        }
        })

    }

function calcSumAvg(lowerBound, upperBound, arr) {

    var obj = {}; var resObj = {};
    for (var i = 0; i < arr.length; i++) {
        key = arr[i];
        obj[key] = '1';
    }
    var minRange = arr[0];
    var maxRange = arr[arr.length - 1];

     if (lowerBound >= minRange && lowerBound <= maxRange && upperBound >= minRange && upperBound <= maxRange)
     console.log("success!!!");
     else
     return null;

     var sum = 0;
     var count = 0;

     for (var i = lowerBound; i <= upperBound; i++) {
         if (obj[i] === '1') {
             sum += Number(i);
            count++;
            }
     }
     resObj.sum = sum;
     resObj.mean = (sum / count);

    return resObj;
}



module.exports.GeneratePrimeNumbers = GeneratePrimeNumbers;
module.exports.calcMean = calcMean;
module.exports.calcSumAvg = calcSumAvg;





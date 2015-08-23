/*
Create a function that:
*   **Takes** an array of animals
*   Each animal has propeties `name`, `species` and `legsCount`
*   **finds** and **prints** the total number of legs to the console in the format:
    *   "Total number of legs: TOTAL_NUMBER_OF_LEGS"
*   **Use underscore.js for all operations**
*/

function solve(){
    'use strict';
    return function (animals) {
        var legsTotalCount = 0;

        if (animals == null) {
            throw new Error('Animals is null or undefined.');
        }

        if (animals.length === 0) {
            return legsTotalCount;
        }

        legsTotalCount = _.reduce(animals, function (memo, animal) {
            return memo + animal.legsCount;
        }, 0);

        console.log('Total number of legs: ' + legsTotalCount);
    };
}

//module.exports = solve;
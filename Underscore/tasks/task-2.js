/*
 Create a function that:
 *   Takes an array of students
 *   Each student has a `firstName`, `lastName` and `age` properties
 *   **finds** the students whose age is between 18 and 24
 *   **prints**  the fullname of found students, sorted lexicographically ascending
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   **Use underscore.js for all operations**
 */

function solve(){
    'use strict';
    return function (students) {
        var studentsOfWantedAge,
            sortedInAscendingOrder;

        if (students == null) {
            throw new Error('Students is null or undefined.');
        }

        if (students.length === 0) {
            return [];
        }

        studentsOfWantedAge = _.filter(students, function (student) {
           var minAge = 18,
               maxAge = 24;

            return minAge <= student.age && student.age <= maxAge;
        });

        if (studentsOfWantedAge.length === 0) {
            return [];
        }

        sortedInAscendingOrder = _.sortBy(studentsOfWantedAge, function (a, b) {
            var fullNameA = a.firstName + ' ' + a.lastName,
                fullNameB = b.firstName + ' ' + b.lastName;

            return fullNameA.localeCompare(fullNameB);
        });

        sortedInAscendingOrder.forEach(function (student) {
            console.log(student.firstName + ' ' + student.lastName);
        });
    };
}

//module.exports = solve;

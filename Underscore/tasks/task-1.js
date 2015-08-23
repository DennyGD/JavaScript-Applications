/*
 Create a function that:
 *   Takes an array of students
 *   Each student has a `firstName` and `lastName` properties
 *   **Finds** all students whose `firstName` is before their `lastName` alphabetically
 *   Then **sorts** them in descending order by fullname
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   Then **prints** them to the console
 *   **Use underscore.js for all operations**
 */

function solve(){
    'use strict';
    return function (students) {
        var studentsFirstNameBeforeLast,
            sortedInDescendingOrder;

        if (students == null) {
            throw new Error('Students is null or undefined.');
        }

        if (students.length === 0) {
            return [];
        }

        studentsFirstNameBeforeLast = _.filter(students, function (student) {
            return student.lastName.localeCompare(student.firstName) > 0;
        });

        sortedInDescendingOrder = _.sortBy(studentsFirstNameBeforeLast, function (a, b) {
            var fullNameA = a.firstName + ' ' + a.lastName,
                fullNameB = b.firstName + ' ' + b.lastName;

            return fullNameB.localeCompare(fullNameA);
        });

        sortedInDescendingOrder.forEach(function (student) {
            console.log(student.firstName + ' ' + student.lastName);
        });
    };
}

//module.exports = solve;

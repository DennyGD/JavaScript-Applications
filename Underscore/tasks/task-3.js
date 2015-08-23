/*
 Create a function that:
 *   Takes an array of students
 *   Each student has:
 *   `firstName`, `lastName` and `age` properties
 *   Array of decimal numbers representing the marks
 *   **finds** the student with highest average mark (there will be only one)
 *   **prints** to the console  'FOUND_STUDENT_FULLNAME has an average score of MARK_OF_THE_STUDENT'
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   **Use underscore.js for all operations**
 */

function solve(){
    'use strict';
    return function (students) {
        var studentsWithAverageMark,
            highestAverageMark = 0,
            bestStudent;

        if (students == null) {
            throw new Error('Students is null or undefined.');
        }

        if (students.length === 0) {
            return [];
        }

        // Decided it was better to copy the argument passed to the function than to change it directly.
        studentsWithAverageMark = JSON.parse(JSON.stringify(students));

        studentsWithAverageMark.forEach(function (student) {
            student.averageMark = averageValueOfNumbers(student.marks);

            if (highestAverageMark < student.averageMark) {
                highestAverageMark = student.averageMark;
                bestStudent = student.firstName + ' ' + student.lastName;
            }
        });

        console.log(bestStudent + ' has an average score of ' + highestAverageMark);

        function averageValueOfNumbers(numbers){
            var numbersCount = numbers.length,
                sum,
                average;

            sum = numbers.reduce(function(sum, num){
                return sum + num;
            }, 0);

            average = sum / numbersCount;
            return average;
        }
    };
}

//module.exports = solve;
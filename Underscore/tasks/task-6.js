/*
 Create a function that:
 *   **Takes** a collection of books
 *   Each book has propeties `title` and `author`
 **  `author` is an object that has properties `firstName` and `lastName`
 *   **finds** the most popular author (the author with biggest number of books)
 *   **prints** the author to the console
 *	if there is more than one author print them all sorted in ascending order by fullname
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   **Use underscore.js for all operations**
 */

function solve(){
    'use strict';
    return function (books) {
        var allAuthorsNotGrouped,
            allAuthorsGrouped,
            authorsWithBooksCount,
            greatestCount,
            mostPopularAuthors;

        if (books == null) {
            throw new Error('Books is null or undefined.');
        }
        
        allAuthorsNotGrouped = _.map(books, function (book) {
            var currentAuthor = book.author,
                authorFullName = currentAuthor.firstName + ' ' + currentAuthor.lastName;

            return {
                name: authorFullName
            };
        });

        allAuthorsGrouped = _.groupBy(allAuthorsNotGrouped, 'name');

        authorsWithBooksCount = _.map(allAuthorsGrouped, function (a) {
            return {
                name: a[0].name,
                booksCount: a.length
            }
        });

        greatestCount = _.max(authorsWithBooksCount, 'booksCount').booksCount;

        mostPopularAuthors = _(authorsWithBooksCount).chain()
            .reject(function (author) {
                return author.booksCount < greatestCount;
            })
            .sortBy('name')
            .value();

        _.each(mostPopularAuthors, function (author) {
            console.log(author.name);
        });
    };
}

//module.exports = solve;
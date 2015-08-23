/*
 Create a function that:
 *   **Takes** an array of animals
 *   Each animal has propeties `name`, `species` and `legsCount`
 *   **groups** the animals by `species`
 *   the groups are sorted by `species` descending
 *   **sorts** them ascending by `legsCount`
 *	if two animals have the same number of legs sort them by name
 *   **prints** them to the console in the format:
 ```
 ----------- (number of dashes is equal to the length of the GROUP_1_NAME + 1)
 GROUP_1_NAME:
 ----------- (number of dashes is equal to the length of the GROUP_1_NAME + 1)
 NAME has LEGS_COUNT legs //for the first animal in group 1
 NAME has LEGS_COUNT legs //for the second animal in group 1
 ----------- (number of dashes is equal to the length of the GROUP_2_NAME + 1)
 GROUP_2_NAME:
 ----------- (number of dashes is equal to the length of the GROUP_2_NAME + 1)
 NAME has LEGS_COUNT legs //for the first animal in the group 2
 NAME has LEGS_COUNT legs //for the second animal in the group 2
 NAME has LEGS_COUNT legs //for the third animal in the group 2
 NAME has LEGS_COUNT legs //for the fourth animal in the group 2
 ```
 *   **Use underscore.js for all operations**
 */

function solve(){
    'use strict';
    return function (animals) {
        var groupedBySpecies,
            groupsSpecies,
            groupsCount,
            currentGroup,
            sortedAnimalsInGroup,
            currentKey,
            dashes,
            i,
            currentAnimal;

        if (animals == null) {
            throw new Error('Animals is null or undefined.');
        }

        if (animals.length === 0) {
            return [];
        }

        groupedBySpecies = _.groupBy(animals, 'species');

        groupsSpecies = Object.keys(groupedBySpecies);
        groupsCount = groupsSpecies.length;

        for (i = 0; i < groupsCount; i += 1) {
            currentKey = groupsSpecies[i];
            currentGroup = groupedBySpecies[currentKey];

            sortedAnimalsInGroup = _(currentGroup).chain()
                .sortBy('name')
                .sortBy('legsCount')
                .value();

            groupedBySpecies[currentKey] = sortedAnimalsInGroup;
        }

        // sorts the species names in descending order
        groupsSpecies.sort();
        groupsSpecies.reverse();

        printOnConsole();

        function printOnConsole() {
            for (i = 0; i < groupsCount; i += 1) {
                currentKey = groupsSpecies[i];
                dashes = getDashes(currentKey.length + 1);

                console.log(dashes);
                console.log(currentKey + ':');
                console.log(dashes);

                currentGroup = groupedBySpecies[currentKey];
                for (var j = 0, len = currentGroup.length; j < len; j += 1) {
                    currentAnimal = currentGroup[j];
                    console.log(currentAnimal.name + ' has ' + currentAnimal.legsCount + ' legs');
                }
            }

            function getDashes(count) {
                var dashes = '';

                for (var i = 0; i < count; i += 1) {
                    dashes += '-';
                }

                return dashes;
            }
        }
    };
}

//module.exports = solve;

// Sorting with underscore -> http://blog.falafel.com/nifty-underscore-tricks-sorting-by-multiple-properties-with-underscore/
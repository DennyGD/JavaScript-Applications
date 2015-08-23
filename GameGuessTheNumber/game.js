(function () {
    'use strict';
    var submitButton = document.getElementById('submit-button'),
        scoresButton = document.getElementById('scores'),
        game,
        newGame;


    game = (function () {
        var game = {
            init: function () {
                var that = this;
                that.computerNumber = generateRandomFourDigitNumber();
                console.log(that.computerNumber);
                that.guessNumberCount = 0;
                return that;
            }
        };

        function generateRandomFourDigitNumber() {
            var result = '',
                digitIsUnique,
                currentDigit;

            result += generateRandomNumber(1, 9);

            for (var i = 0; i < 3; i += 1) {
                digitIsUnique = false;

                while (!digitIsUnique) {
                    currentDigit = generateRandomNumber(0, 9);
                    digitIsUnique = result.indexOf(currentDigit) === -1;
                }

                result += currentDigit;
            }

            return result;
        }

        // Returns a random integer between min (included) and max (included)
        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return game;
    }());

    newGame = Object.create(game).init();

    submitButton.addEventListener('click', function () {
        var userInput = document.getElementById('user-number'),
            userInputValue = userInput.value,
            resultOutput = document.getElementById('guess-result'),
            isValidGameNumber = checkIfValidGameNumber(userInputValue),
            comparisonResult,
            userWon,
            resultMessage,
            nickname,
            isValidNickname;

        if (isValidGameNumber) {
            newGame.guessNumberCount += 1;

            comparisonResult = getResultFromComparingTheNumbers(('' + newGame.computerNumber), userInputValue);
            userWon = comparisonResult.bulls === 4;

            if (userWon) {
                resultMessage = "You've won!";
                resultOutput.value = resultMessage;
                nickname = window.prompt('Please enter your nickname (10 symbols max)');
                isValidNickname = checkIfValidNickname(nickname);

                if (isValidNickname) {
                    SaveScore(nickname, newGame.guessNumberCount);
                }

                newGame = Object.create(game).init();
                userInput.value = '';
                resultMessage = 'You can play again...';
                console.log(getHighScores());
            } else {
                resultMessage = 'Bulls: ' + comparisonResult.bulls + ' Cows: ' + comparisonResult.cows;
            }
        } else {
            resultMessage = 'Invalid number.';
        }

        resultOutput.value = resultMessage;
    }, false);

    scoresButton.addEventListener('click', function () {
        var action = scoresButton.innerHTML,
            showText = 'Show High Scores',
            hideText = 'Hide High Scores',
            highScores,
            highScoresElement;

        if (action === showText) {
            scoresButton.innerHTML = hideText;
            highScores = getHighScores();
            highScoresElement = generateListOfScores(highScores);
            document.body.appendChild(highScoresElement);
        } else {
            scoresButton.innerHTML = showText;
            highScoresElement = document.getElementById('scores-list');
            highScoresElement.parentNode.removeChild(highScoresElement);
        }

    }, false);

    function checkIfValidGameNumber(userInput) {
        var expectedLength = 4,
            actualLength = userInput.length,
            firstCharacter,
            allAreDigits,
            digitsAreUnique;

        if (actualLength !== expectedLength) {
            return false;
        }

        firstCharacter = userInput[0];
        if (firstCharacter === '0') {
            return false;
        }

        if (isNaN(userInput)) {
            return false;
        }

        allAreDigits = userInput.split('').every(function (ch) {
            return isNaN(ch) === false;
        });

        if (!allAreDigits) {
            return false;
        }

        digitsAreUnique = containsUniqueChars(userInput);
        if (!digitsAreUnique) {
            return false;
        }

        return true;
    }

    function containsUniqueChars(stringToCheck) {
        var foundSoFar = {},
            len = stringToCheck.length,
            currentChar;

        for (var i = 0; i < len; i += 1) {
            currentChar = stringToCheck[i];

            if (foundSoFar[currentChar]) {
                return false;
            } else {
                foundSoFar[currentChar] = true;
            }
        }

        return true;
    }

    // Uses the string representations of the two numbers
    function getResultFromComparingTheNumbers(originalNumber, guessNumber) {
        var bullsCount = 0,
            cowsCount = 0,
            len = guessNumber.length,
            originalDigit,
            guessDigit,
            cowFound,
            result;

        for (var i = 0; i < len; i += 1) {
            originalDigit = originalNumber[i];
            guessDigit = guessNumber[i];

            if (guessDigit === originalDigit) {
                bullsCount += 1;
            } else {
                cowFound = originalNumber.indexOf(guessDigit) > -1;
                if (cowFound) {
                    cowsCount += 1;
                }
            }
        }

        result = {
            bulls: bullsCount,
            cows: cowsCount
        };
        return result;
    }

    function checkIfValidNickname(nickname) {
        var containsWhitespace;

        if (nickname == null || nickname.length === 0) {
            return false;
        }

        if (nickname.length > 10) {
            return false;
        }

        containsWhitespace = nickname.split('').some(function (ch) {
            return ch === ' ';
        });

        if (containsWhitespace) {
            return false;
        }

        return true;
    }

    function SaveScore(nickname, currentScore) {
        var nicknameScores = localStorage.getItem(nickname),
            deserializedNicknameScores;

        if (nicknameScores) {
            deserializedNicknameScores = JSON.parse(nicknameScores);
            deserializedNicknameScores.push(currentScore);
            localStorage.setItem(nickname, JSON.stringify(deserializedNicknameScores));
        } else {
            localStorage.setItem(nickname, JSON.stringify([currentScore]));
        }
    }

    function getHighScores() {
        var allKeys = Object.keys(localStorage),
            len = allKeys.length,
            allData = [],
            currentKeyValuePair,
            currentScores,
            currentKey,
            scoresCount,
            sortedData;

        if (len === 0) {
            return allData;
        }

        for (var i = 0; i < len; i += 1) {
            currentKey = allKeys[i];
            currentScores = JSON.parse(localStorage.getItem(currentKey));
            scoresCount = currentScores.length;

            for (var j = 0; j < scoresCount; j += 1) {
                currentKeyValuePair = {
                    nickname: currentKey,
                    score: currentScores[j]
                };

                allData.push(currentKeyValuePair);
            }
        }

        sortedData = _.sortBy(allData, 'score');
        return sortedData.slice(0, 10);
    }

    function generateListOfScores(scoresArr) {
        var scoresArrLen = scoresArr.length,
            result,
            listItem,
            currentListItem,
            userScore;

        if (scoresArrLen === 0) {
            result = document.createElement('div');
            result.innerHTML = "There aren't any scores yet.";
        } else {
            result = document.createElement('ul');
            listItem = document.createElement('li');

            for (var i = 0; i < scoresArrLen; i += 1) {
                userScore = scoresArr[i];
                currentListItem = listItem.cloneNode(true);
                currentListItem.innerHTML = userScore.nickname + ' - ' + userScore.score;
                result.appendChild(currentListItem);
            }
        }

        result.id = 'scores-list';
        return result;
    }
}());

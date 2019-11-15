const friendsObjects = require('../data/friends.js')

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsObjects);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body)
        friendsObjects.push(req.body);
        var test = friendsObjects[findMatch()]
        // res.json(friendsObjects[findMatch()]);
        console.log(test)
        res.json(test);
    });
}

function findMatch() {
    let currentUserScores = friendsObjects[friendsObjects.length - 1].scores;
    let arrayDifferences = [];
    for (let i = 0; i < friendsObjects.length - 1; i++) {
        let sumDifferences = 0;
        let currentComparison = friendsObjects[i].scores;
        for (let j = 0; j < 10; j++) {
            sumDifferences += Math.abs(currentUserScores[j] - currentComparison[j]);
        }
        arrayDifferences.push({ friendsIndex: i, differenceToUser: sumDifferences });
    }
    let minDifference = 51;
    let minDifferenceIndex = 0;
    for (let k = 0; k < arrayDifferences.length; k++) {
        if (arrayDifferences[k].differenceToUser < minDifference) {
            minDifference = arrayDifferences[k].differenceToUser;
            minDifferenceIndex = arrayDifferences[k].friendsIndex;
        }
    }
    return minDifferenceIndex;


}
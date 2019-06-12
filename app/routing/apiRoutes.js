var tableArray = require("../data/friendData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/friends", function(req, res) {
     return res.json(tableArray);
    });
  
 
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
  
    app.post("/api/friends", function(req, res) {
      // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
      // It will do this by sending out the value "true" have a table
      // req.body is available since we're using the body parsing middleware
      var scoreDifference;
      var friendScore = 0;
      var userScore = 0;
      var newUser = req.body.scores;
  
      var bestMatch = {
        name: "",
        photo: "",
        friendDiff: 45
      };
  
      for (var i = 0; i < tableArray.length; i++) {
        var currentFriend = tableArray[i];
        scoreDifference = 0;
        console.log(tableArray[i]);
        for (var j = 0; j < newUser.length; j++) {
          friendScore = currentFriend.scores[j];
  
          userScore = newUser[j];
  
          scoreDifference += Math.abs(
            parseInt(userScore) - parseInt(friendScore)
          );
          console.log(scoreDifference);
        }
        console.log(scoreDifference);
        if (scoreDifference <= bestMatch.friendDiff) {
          bestMatch.name = currentFriend.name;
          bestMatch.photo = currentFriend.photo;
          bestMatch.friendDiff = scoreDifference;
        }
      }
      console.log(bestMatch);
      res.json(bestMatch);
      tableArray.push(req.body);
    });
    
  };
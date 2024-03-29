//Intialize Firebase
var config = {
  apiKey: "AIzaSyA7Q2rAgvjZzzyrVk9aqVHjuotl1AwTDgs",
  authDomain: "hawks-app-d7bf9.firebaseapp.com",
  databaseURL: "https://hawks-app-d7bf9.firebaseio.com",
  projectId: "hawks-app-d7bf9",
  storageBucket: "hawks-app-d7bf9.appspot.com",
  messagingSenderId: "47736646938",
  appId: "1:47736646938:web:db46e68dfe633622"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Employees
$("#add-train-button").on("click", function (event) {
  event.preventDefault();

  //Grabs user input
  var name = $("#name-input").val().trim();
  var location = $("#location-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // creates local "tepmporary" oblect for holding train data 
  var newTrain = {
    name: name,
    location: location,
    firstTrain: firstTrain,
    frequency: frequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.location);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Roller Coaster successfully");

  //clears all of the text-boxes
  $("name-input").val("");
  $("location-input").val("");
  $("firstTrain-input").val("");
  $("frequency-input").val("");
});

//CReate Firebase event for adding trains to the database and a row in thw html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  //Store everything in to a variable
  var name = childSnapshot.val().name;
  var location = childSnapshot.val().location;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  //train info
  console.log(name);
  console.log(location);
  console.log(firstTrain);
  console.log(frequency);

  // var newRow = $("<tr>").append(
  //   $("<td>").text(name),
  //   $("<td>").text(location),
  //   $("<td>").text(firstTrain),
  //   $("<td>").text(frequency),
  //   $("<td>").text(nextRide),
  //   $("<td>").text(leavingIn)
  // );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTrainConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var leavingIn = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + leavingIn);

  // Next Train
  var nextRide = moment().add(leavingIn, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextRide).format("hh:mm"));
  $("#trainTable > tbody").append("<td><td>" + name + "</td><td>" + location  + "</td><td>" + frequency + "</td><td>" + nextRide + "</td><td>" + leavingIn + "</td></tr>");

  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(location),
    $("<td>").text(firstTrain),
    $("<td>").text(frequency),
    $("<td>").text(nextRide),
    $("<td>").text(leavingIn)
  );

  //Append the new row to the table
  $("#train-table > tbody").append(newRow);

});




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
var name = "";
var location = "";
var firstTrain = "";
var frequency = 0;

$("#add-train").on("click", function(event) {
    event.preventDefault();
    name = $("#name-input").val().trim();
    location = $("#location-input").val().trim();
    firstTrain = $("firstTrain-input").val().trim();
    frequency = $("frequency-input").val().trim();

    database.ref().push({
      name: name,
      location: location,
      firstTrain: firstTrain,
      frequency: frequency,
      dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
    database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();
    var newRow = $("<tr>");
    var nameData = $("<td>");
    nameData.text(sv.name);
    var locationData = $("<td>");
    loactionData.text(sv.location);
    var firstTrainData = $("<td>");
    firstTrainData.text(sv.firstTrain);
    var frequencyData = $("<td>");
    frequencyData.text(sv.frequency);

    console.log(sv.name);
    console.log(sv.location);
    console.log(sv.firstTrain);
    console.log(sv.frequency);
    newRow.append(nameData, locationData, firstTrainData, frequencyData);
    $("tbody").append(newRow);
});



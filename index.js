
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAJGfjauMDLHfX-UrYw5hfI6qge-72xX94",
    authDomain: "train-ec620.firebaseapp.com",
    databaseURL: "https://train-ec620.firebaseio.com",
    projectId: "train-ec620",
    storageBucket: "train-ec620.appspot.com",
    messagingSenderId: "390685970881",
    appId: "1:390685970881:web:e1441dea655d6de1"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);






  var database = firebase.database();

$("#formID").on("submit", function (event) {
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var destination = $("#trainDestination").val().trim();
    var firstTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    });

    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

    return false;
  });

database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {

  var updateButton = $("<button>").html("<span class='glyphicon glyphicon-edit'></span>").addClass("updateButton").attr("data-index", index).attr("data-key", childSnapshot.key);
  var removeButton = $("<button>").html("<span class='glyphicon glyphicon-remove'></span>").addClass("removeButton").attr("data-index", index).attr("data-key", childSnapshot.key);

  var firstTime = childSnapshot.val().firstTime;
  var tFrequency = parseInt(childSnapshot.val().frequency);
  var firstTrain = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTrain);
  console.log(firstTime);
  var currentTime = moment();
  var currentTimeCalc = moment().subtract(1, "years");
  var diffTime = moment().diff(moment(firstTrain), "minutes");
  var tRemainder = diffTime%tFrequency;
  var minutesRemaining = tFrequency - tRemainder;
  var nextTRain = moment().add(minutesRemaining, "minutes").format ("hh:mm A");
  var beforeCalc = moment(firstTrain).diff(currentTimeCalc, "minutes");
  var beforeMinutes = Math.ceil(moment.duration(beforeCalc).asMinutes());

  if ((currentTimeCalc - firstTrain) < 0) {
    nextTrain = childSnapshot.val().firstTime;
    console.log("Before First Train");
    minutesRemaining = beforeMinutes;
  }
  else {
    nextTrain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
    minutesRemaining = tFrequency - tRemainder;
    console.log("Working");
  }


  var newRow = $("<tr>");
  newRow.addClass("row-" + index);
  var cell1 = $("<td>").append(updateButton);
  var cell2 = $("<td>").text(childSnapshot.val().name);
  var cell3 = $("<td>").text(childSnapshot.val().destination);
  var cell4 = $("<td>").text(childSnapshot.val().frequency);
  var cell5 = $("<td>").text(nextTrain);
  var cell6 = $("<td>").text(minutesRemaining);
  var cell7 = $("<td>").append(removeButton);

  

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

  
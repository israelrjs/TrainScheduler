


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdAOG4TiSnUIS-09bViDI8kvLKTDrOsVw",
    authDomain: "trainschedule-11759.firebaseapp.com",
    databaseURL: "https://trainschedule-11759.firebaseio.com",
    projectId: "trainschedule-11759",
    storageBucket: "trainschedule-11759.appspot.com",
    messagingSenderId: "692483309245"
  };
  firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var Dest = "";
var Time = 0;
var Freq = "";

// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();
  

  // Grabbed values from text boxes
  name = $("#Name").val().trim();
  Dest = $("#Destination").val().trim();
  Time = $("#Time").val().trim();
  Freq = $("#Frequency").val().trim();

  // Code for handling the push
  database.ref().push({
    name: name,
    Dest: Dest,
    Freq: Freq,
    Time: Time,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  
});

database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    var tBody = $("tbody");
    var tRow = $("<tr>");

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var trainName = $("<td>").text(sv.name);
    var trainDest = $("<td>").text(sv.Dest);
    var trainFreq = $("<td>").text(sv.Freq);
    var trainTime = $("<td>").text(sv.Time);
    

    cleardata();

    var firstTime = "01:00:00"
    var diffinTime = moment().diff(moment(firstTime, "hh:mm"),"minutes")
    console.log(moment(diffinTime).format("hh:mm"));
    console.log(diffinTime);

  var newFreq = (sv.Freq);

  console.log(newFreq);

  var tRemainder  = diffinTime % newFreq

  console.log(tRemainder);


  var minNextTrain = newFreq - tRemainder;

  console.log(minNextTrain);

  var nextTrain = moment().add(minNextTrain,"minutes");

  console.log(nextTrain);

  var minAwawy = $("<td>").text((nextTrain).format("hh:mm"));

  console.log(moment(nextTrain).format("hh:mm"));

  // Append the newly created table data to the table row
  tRow.append(trainName,trainDest,trainFreq,trainTime,minAwawy);
  // Append the table row to the table body
  tBody.append(tRow);
 

  });
  // Clear Text Box
  function cleardata(){
    name = $("#Name").val(" ")
    Dest = $("#Destination").val(" ")
    Time = $("#Time").val(" ")
    Freq = $("#Frequency").val(" ")
  }
 

  

  








    
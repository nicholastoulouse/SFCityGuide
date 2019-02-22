var config = {
    apiKey: "AIzaSyByFBjvaLKPZuh7N_wIUmlu1zWQrg0ec2Y",
    authDomain: "guidedwalkingtours.firebaseapp.com",
    databaseURL: "https://guidedwalkingtours.firebaseio.com",
    projectId: "guidedwalkingtours",
    storageBucket: "guidedwalkingtours.appspot.com",
    messagingSenderId: "215314389294"
};

firebase.initializeApp(config);
// Get an instance of the database
var database = firebase.database(); 
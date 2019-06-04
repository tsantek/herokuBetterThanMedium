const firebaseConfig = {
    apiKey: "AIzaSyAUFDCZttzZq9sneO7cTDpS3lf4MM0nsMA",
    authDomain: "herokubetterthanmedium.firebaseapp.com",
    databaseURL: "https://herokubetterthanmedium.firebaseio.com",
    projectId: "herokubetterthanmedium",
    storageBucket: "herokubetterthanmedium.appspot.com",
    messagingSenderId: "277782812272",
    appId: "1:277782812272:web:23b7b6404163bcab"
};


document.addEventListener("DOMContentLoaded", function() {

    document.querySelector('.login-form').addEventListener('submit', (e) => {
        e.preventDefault()
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
    })


});




// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
// });


// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//     } else {
//         // No user is signed in.
//     }
// });
const firebaseConfig = {
    apiKey: "AIzaSyAUFDCZttzZq9sneO7cTDpS3lf4MM0nsMA",
    authDomain: "herokubetterthanmedium.firebaseapp.com",
    databaseURL: "https://herokubetterthanmedium.firebaseio.com",
    projectId: "herokubetterthanmedium",
    storageBucket: "herokubetterthanmedium.appspot.com",
    messagingSenderId: "277782812272",
    appId: "1:277782812272:web:23b7b6404163bcab"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

document.addEventListener("DOMContentLoaded", function() {

    document.querySelector('.login-form').addEventListener('submit', (e) => {
        e.preventDefault()
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log("Loged in")
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    })

    document.querySelector('.logout').addEventListener('click', () => {

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Signout")
        }).catch(function(error) {
            // An error happened.
        });

    })

});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.querySelector('.newpost').style.display = "block";
        document.querySelector('.profile').style.display = "block";
        document.querySelector('.logout').style.display = "block";
        document.querySelector('.delete').style.display = "block";
        document.querySelector('.dropdown').style.display = "none";
        console.log("LOGED IN")
            // User is signed in.
    } else {
        console.log("NOT LOGED IN")
        document.querySelector('.dropdown').style.display = "block";
        document.querySelector('.newpost').style.display = "none";
        document.querySelector('.profile').style.display = "none";
        document.querySelector('.logout').style.display = "none";
        document.querySelector('.delete').style.display = "none";
        // No user is signed in.
    }
});
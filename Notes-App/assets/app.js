
console.log("Hello world")


// Declaring elements as constants

const signInBlock = document.getElementById('signInCard');
const welcomeScreen = document.getElementById('welcomeScreen');
const SignUpBlock = document.getElementById('registerUser');



function goToRegister(){
    document.getElementById('signInCard').style.display='none';
    document.getElementById('registerUser').style.display='block';
}

function goToSignIn(){
    document.getElementById('signInCard').style.display='block';
    document.getElementById('registerUser').style.display='none';
}


function AuthenticateUser(){
    console.log("user auth");
    // :todo

    document.getElementById('welcomeScreen').style.display='none';
}

function RegisterUser(){
    console.log("user register");
    // :todo
    document.getElementById('welcomeScreen').style.display='none';
}
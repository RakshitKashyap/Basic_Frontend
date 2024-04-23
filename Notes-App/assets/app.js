
console.log("Hello world")


// Declaring elements as constants

const signInBlock = document.getElementById('signInCard');
const welcomeScreen = document.getElementById('welcomeScreen');
const SignUpBlock = document.getElementById('registerUser');
const addNewButton = document.getElementById('newNoteButton');
const logoutButton = document.getElementById('LogoutBtn');

const loggedInUser = {};

function makeSignupAvailable(){
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPass').value;

    if(password != confirmPassword || password==''){
        console.error("Inavlid Password and Confirm Password");
        return;
    }

    button  = document.getElementById('registerButton');
    button.style.cursor='pointer';
    button.disabled=false;
    //button.setAttribute('onclick', 'RegisterUser()')
}

function goToRegister(){
    document.getElementById('signInCard').style.display='none';
    document.getElementById('registerUser').style.display='block';
}

function goToSignIn(){
    document.getElementById('signInCard').style.display='block';
    document.getElementById('registerUser').style.display='none';
}


function AuthenticateUser(input){
    loggedInUser.user = input;
    document.getElementById('welcomeScreen').style.display='none';
    document.getElementById('newNoteButton').style.display='block';
    document.getElementById('LogoutBtn').style.display='block';
    createDefaultNotes(input);
}

function logoutUser(){
    document.getElementById('newNoteButton').style.display='none';
    document.getElementById('LogoutBtn').style.display='none';
    document.getElementById('mainContent').style.display='none';
    document.getElementById('welcomeScreen').style.display='flex';
    localStorage.setItem('userLoggedIn', false);
}

function RegisterUser(input){
    console.log("user register");
    localStorage.setItem('userLoggedIn', true);
    AuthenticateUser(input)

}

function deleteNote(input){
    user = loggedInUser.user;
    let result = confirm('Are you sure you want to delete this note');
    if(!result){
        return
    }
    let currentValues = JSON.parse( localStorage.getItem(user) );
    currentValues.splice(parseInt(input),1);
    localStorage.setItem(user, JSON.stringify(currentValues));
}

function editNote(input){
    console.log("edit note with id:: "+input)
}

function createDefaultNotes(input){
    
    console.log(input);
    let user = input;
    var existingNotes = JSON.parse(localStorage.getItem(user));
    if(!existingNotes){
        existingNotes = [];
    }

    for(i = 0 ; i< existingNotes.length ; i++){
        createNoteBlock(existingNotes[i], user, false);
    }
}

function createNote(){

    var title = document.getElementById('noteTitle');
    var subTitle = document.getElementById('noteSubTitle');
    var text = document.getElementById('noteText');

    if(title.value == ''){
        console.error("Title can't be empty")
        return;
    }

    const obj = {
        title: title.value,
        subTitle: subTitle.value,
        text:text.value
    };

    user = loggedInUser.user;

    var currentValues =   JSON.parse(localStorage.getItem(user));
    if(currentValues=='' || currentValues == null){
        currentValues = [];
    }

   
    currentValues.push(obj);
   
    localStorage.setItem(user, JSON.stringify(currentValues));
    createNoteBlock(obj, user, true);
}

function createNoteBlock(obj, user, isNew){

    var currentValues =   JSON.parse(localStorage.getItem(user));
    if(currentValues=='' || currentValues == null){
        currentValues = [];
    }
    
    //console.log(currentValues);

    let main_div = document.createElement('div');
    let head_div = document.createElement('div');
    let body_div = document.createElement('div');
    let foot_div = document.createElement('div');
    let tempId=-1;
    if(isNew){
        tempId = (currentValues.length+1);
    }
    else{
       // console.log(currentValues);
        console.log(obj)
        currentValues.forEach((item, i) => {
            if (JSON.stringify(item) == JSON.stringify(obj)) {
                tempId = i;
                return;
            }
        });
    }
    
    main_div.classList.add("card","customNotes");
    main_div.setAttribute('id', "notes_"+tempId);

    head_div.classList.add("card-header");

    var title = document.createElement('h5');
    var subTitle = document.createElement('h6');

    title.classList.add("card-title","col-sm");
    subTitle.classList.add("card-subtitle","mb-1","text-body-secondary");

    var titleText = document.createTextNode(obj.title);
    var subTitleText = document.createTextNode(obj.subTitle);

    title.appendChild(titleText);
    subTitle.appendChild(subTitleText);

    head_div.appendChild(title);
    head_div.appendChild(subTitle);

    main_div.appendChild(head_div);

    body_div.classList.add("card-body");
    
    let para = document.createElement('p');
    let paraText = document.createTextNode(obj.text);

    para.appendChild(paraText);
    body_div.appendChild(para);

    main_div.appendChild(body_div);

    foot_div.classList.add("card-footer");

    let footSub = document.createElement('div');
    footSub.classList.add("icons","col-sm","justify-content-end");

    let editImg = document.createElement('img');
    let deleImg = document.createElement('img');

    editImg.setAttribute('alt','Edit note icon');
    editImg.setAttribute('class','editIcon');
    editImg.setAttribute('onclick','editNote("'+tempId+'")');
    editImg.setAttribute('title','Edit Note');
    editImg.setAttribute('src','assets/icons/pencil-square.svg');


    deleImg.setAttribute('alt','Delete note icon');
    deleImg.setAttribute('class','deleteIcon');
    deleImg.setAttribute('onclick','deleteNote("'+tempId+'")');
    deleImg.setAttribute('title','Delete Note');
    deleImg.setAttribute('src','assets/icons/trash3.svg');


    footSub.appendChild(editImg);
    footSub.appendChild(deleImg);

    foot_div.appendChild(footSub);
    main_div.appendChild(foot_div);

    document.getElementById('mainContent').appendChild(main_div);
    
}
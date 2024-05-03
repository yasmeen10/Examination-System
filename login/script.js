var userEmail = document.getElementById("email");
var password = document.getElementById("password");
var submit = document.getElementById("submit");
var form = document.getElementsByTagName("form")[0];
var currEmail=localStorage.getItem("userEmail");
var currPassword = localStorage.getItem("userPassword");
const regxEmail =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function displayError(el,errorMsg){
    var errorElement = document.getElementById(el);
    errorElement.textContent =errorMsg;
    errorElement.style.display = "block";
}

function valid(){
    var isValid = true;
    if(userEmail.value === ""){
        displayError("emailError","Please Enter your e-mail");
        isValid = false;
    }
    else if(!regxEmail.test(userEmail.value)){
        displayError("emailError","Invalid E-mail");
        isValid = false;
    }
    else if(userEmail.value !== currEmail){
        console.log(currEmail);
        console.log(userEmail.value)
        displayError("emailError","Incorrect email or password");
        isValid = false;
    }

    if(password.value === ""){
        displayError("passwordError","Please Enter your password");
        isValid = false;
    }
    else if(!passwordRegex.test(password.value)){
        displayError("passwordError","Invalid password");
        isValid = false;
    }
    else if(password.value !== currPassword){
        displayError("emailError","Incorrect email or password");
        isValid = false;
    }

    return isValid;
}

form.addEventListener("submit",function(event){
    var isValid = valid();
    event.preventDefault();
    if(isValid){
        displayError("emailError","");
        displayError("passwordError","");
        location.replace("../Start page/index.html")
    }
})
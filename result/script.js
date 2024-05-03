var fName = localStorage.getItem("firstName");
var lName = localStorage.getItem("lastName");
var  result = localStorage.getItem("result");
var nameDiv = document.getElementsByClassName("name")[0];
var resDiv = document.getElementsByClassName("result")[0];

nameDiv.textContent=`Great job! ${fName} ${lName}`;
resDiv.textContent=`${result}/10`;


document.addEventListener("DOMContentLoaded",function(){
    confetti({
        particleCount: 200,
        spread:70,
        angle:60,
        origin: { x: 0, y: 1 },
        colors:["#ffffff"],
        shapes:['circle']
    });
    confetti({
        particleCount: 200,
        spread:70,
        angle:120,
        origin: { x: 1, y: 1 },
        colors:["#ffffff"],
        shapes:['circle']
    });
})
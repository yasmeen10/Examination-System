var loginBtn = document.getElementsByClassName("login")[0];
function validateForm() {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        input.classList.add('error');
        error.innerText = message;
        error.style.display="block"
    }

    function resetErrors() {
        const inputs = document.querySelectorAll('input');
        const errors = document.querySelectorAll('.error');
        inputs.forEach(input => input.classList.remove('error'));
        errors.forEach(error => error.innerText = '');
    }

    resetErrors();

    let formIsValid = true;

    if (!nameRegex.test(document.getElementById('fname').value)) {
        showError('fname', 'fnameError', 'Invalid first name');
        formIsValid = false;
    }

    if (!nameRegex.test(document.getElementById('lname').value)) {
        showError('lname', 'lnameError', 'Invalid last name');
        formIsValid = false;
    }

    if (!emailRegex.test(document.getElementById('email').value)) {
        showError('email', 'emailError', 'Invalid email address');
        formIsValid = false;
    }

    if (!passwordRegex.test(document.getElementById('pass').value)) {
        showError('pass', 'passError', 'Password must be at least 8 characters and contain at least one digit, one lowercase and one uppercase letter');
        formIsValid = false;
    }

    const pass1 = document.getElementById('pass').value;
    const pass2 = document.getElementById('pass2').value;

    if (pass1 !== pass2) {
        showError('pass2', 'pass2Error', 'Passwords do not match');
        formIsValid = false;
    }

    if (formIsValid) {
        console.log("success");

        
        saveCredentials();

        
        redirectToLoginPage();
    }
}

function saveCredentials() {
    const fName = document.getElementById('fname').value;
    const lName = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    localStorage.setItem('firstName',fName);
    localStorage.setItem('lastName',lName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
}

function redirectToLoginPage() {
    window.location.replace('../login/index.html');
}
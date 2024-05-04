// Getting form and input elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phonenumber = document.getElementById('phonenumber');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

// Listening for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Preventing default form submission
    validate(); // Calling validation function
});

// Function to send data if all fields are successfully validated
const sendData = (username, sRate, count) => {
    if (sRate === count) {
        alert("Register SuccessFull", username); // Showing alert
        swal("Welcome " + username, "Registration Successfull", "success") // Showing sweet alert
        location.href = `submit.html?username=${username}` // Redirecting to demo.html with username query parameter
    }
}

// Function to check if all fields are successfully validated
const successMsg = (username) => {
    let formControl = document.getElementsByClassName('form-control');
    let count = formControl.length - 1;
    console.log("count ", count)
    for (let i = 0; i < formControl.length; i++) {
        if (formControl[i].className === "form-control success") {
            let sRate = 0 + i;
            console.log("srate ", sRate, " ", i)
            sendData(username, sRate, count); // Calling sendData function if all fields are successfully validated
        } else {
            return false;
        }
    }
}

// Function to validate email format
const isEmail = (emailval) => {
    // Getting the length of the email string
    const emailLength = emailval.length - 1;

    // Finding the index of '@' symbol in the email
    const atSymbol = emailval.indexOf('@');

    // If the '@' symbol is found at an index less than 3, the email is considered invalid
    if (atSymbol < 3) return false;

    // Finding the last occurrence of '.' in the email
    const dot = emailval.lastIndexOf('.');

    // If the difference between the position of '.' and '@' symbol is less than 3, the email is considered invalid
    if (dot - (atSymbol + 1) < 3) return false;

    // If the difference between the length of the email and the position of '.' is less than 2, the email is considered invalid
    if (emailLength - dot < 2) return false;

    // If '.' is the last character in the email, the email is considered invalid
    if (dot === emailLength) return false;

    // If all the conditions are passed, the email is considered valid
    return true;

}

// Function to perform form validation
const validate = () => {
    const usernameval = username.value.trim();
    const emailval = email.value.trim();
    const phonenumberval = phonenumber.value.trim();
    const passwordval = password.value.trim();
    const cpasswordval = cpassword.value.trim();

    // Validating username
    if (usernameval === '') {
        setErrorMsg(username, "username can't be blank");
    } else if (usernameval.length <= 3) {
        setErrorMsg(username, "username min 3 char");
    } else {
        setSuccessMsg(username)
    }

    // Validating email
    if (emailval === '') {
        setErrorMsg(email, "email can't be blank");
    } else if (!isEmail(emailval)) {
        setErrorMsg(email, "Not a valid email");
    } else {
        setSuccessMsg(email);
    }

    // Validating phone number
    if (phonenumberval === '') {
        setErrorMsg(phonenumber, "Phone Number Can't Be blank");
    } else if (phonenumberval.length !== 10) {
        setErrorMsg(phonenumber, "Phone Number must be 10 digit");
    } else if (phonenumberval.length > 10) {
        phonenumberval.disabled = true;
    } else {
        setSuccessMsg(phonenumber)
    }

    // Validating password
    if (passwordval === '') {
        setErrorMsg(password, "Password can't be blank");
    } else if (passwordval.length < 8) {
        setErrorMsg(password, "Password must be 8 character")
    } else {
        setSuccessMsg(password)
    }

    // Validating confirm password
    if (cpasswordval === "") {
        setErrorMsg(cpassword, "Confirm password can't be blank")
    } else if (passwordval !== cpasswordval) {
        setErrorMsg(cpassword, "Password doesn't match")
    } else {
        setSuccessMsg(cpassword)
    }
    successMsg(usernameval); // Checking if all fields are successfully validated
}

// Function to set error message for an input field
const setErrorMsg = (input, errorMsg) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error"
    small.innerText = errorMsg;
}

// Function to set success message for an input field
const setSuccessMsg = (input) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control success"
}

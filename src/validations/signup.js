import isEmpty from 'lodash/isEmpty'

export default function validationInput(data) {
    let errors = {};
    let pas =checkPwd(data.password)
    console.log("--Validate--", data);
    if (!data.username) {
        errors.username = "This field is required";
    }
    if (!data.email) {
        errors.email = "This field is required";
    }
    if (!validateEmail(data.email)) {
        errors.email = "This email is wrong";
    }
    if (!data.password) {
        errors.password = "This field is required";
    }
    else if(pas) {
        errors.password = pas;
    }
    if (!data.passwordConfirmation) {
        errors.passwordConfirmation = "This field is required";
    }
    else if (data.password != data.passwordConfirmation) {
        errors.passwordConfirmation = "Confirmation is wrong";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkPwd(str) {
    if (str.length < 6) {
        return ("Password is too short");
    } else if (str.length > 50) {
        return ("Password is too long");
    } else if (str.search(/\d/) == -1) {
        return ("Password contains no number");
    } else if (str.search(/[a-zA-Z]/) == -1) {
        return ("Password contains no letter");
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        return ("Password contains bad symbol");
    }
    return false;
}
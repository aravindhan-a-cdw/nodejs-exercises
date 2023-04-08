
const REQUEST_STATUS = {
    FAILED: "failed",
    SUCCESS:"success"
}

const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

const ERRORS = {
    UNAUTHENTICATED_USER: "UNAUTHENTICATED_USER",
    SERVER_ERROR: "SERVER_ERROR",
    ALREADY_LOGGED_IN: "ALREADY_LOGGED_IN",
    LOGIN_FAILED: "LOGIN_FAILED",
    CREDENTIAL_VALIDATION: "CREDENTIAL_VALIDATION",
}

const MESSAGES = {
    // Error MEssages
    UNAUTHENTICATED_USER: "Unauthenticated user! You need to login to access this page.",
    LOGIN_FAILED: "Username or password is incorrect!",
    CREDENTIAL_VALIDATION: "Username or password field cannot be empty!",
    ALREADY_LOGGED_IN: "You are already logged in!",
    SERVER_ERROR: "Server couldn't process your request!",

    // Success Messages
    LOGIN_SUCCESS: "Log in successful",
    ACCOUNT_CREATION_SUCCESS: "Your account has been created successfully!",
}


module.exports = {
    REQUEST_STATUS, MESSAGES, STATUS_CODES, ERRORS
}

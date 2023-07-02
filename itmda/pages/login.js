function login(event) {
    event.preventDefault(); // Prevent form submission

    // Get the form values
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log("Email:", email)
    console.log("Password:", password)

    get_logins(email, password)
}

function get_logins(email, password) {
    // Create a new XHR object
    var xhttp = new XMLHttpRequest();

    // Set up the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Request completed successfully
            var response = this.responseText;
            // Here you handle the response
            if (response === "success") {
                // Successful login, redirect to admin page
                window.location.href = "dashboard.php";
            } else {
                // Show error message
                var errorMessage = document.getElementById("error-message");
                errorMessage.textContent = "Invalid email or password.";
                console.log(response);
            }
        }
    };

    // Open the request
    xhttp.open('POST', 'get_logins.php', true);

    // Set the request headers (if necessary)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Prepare the data to be sent
    var data = "email=" + email + "&password=" + password;

    // Send the request with the data
    xhttp.send(data);
}
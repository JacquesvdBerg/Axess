<?php
// Establish a database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "axess";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the ID from the request
if (isset($_POST['id'])) {
    $id = (int) $_POST['id'];

    // Query the account requests table
    $sql = "SELECT * FROM accountrequests WHERE requestID = '$id';";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the row data
        $row = $result->fetch_assoc();
        $requestID = $row['requestID'];
        $name = $row['name'];
        $surname = $row['surname'];
        $email = $row['email'];
        $password = $row['password'];
        $workingArea = $row['workingArea'];
        $areasRequested = $row['areasRequested'];

        // Delete the row from account requests table
        $deleteSql = "DELETE FROM accountrequests WHERE requestID = $requestID";
        $conn->query($deleteSql);

        // Insert into the users table
        $insertsql = "INSERT INTO users (userID, name, surname, email, password, workingArea, areasAccessible) VALUES (NULL, '$name', '$surname', '$email', '$password', '$workingArea', '$areasRequested');";
        if ($conn->query($insertsql) === TRUE) {
            echo "New user inserted successfully.";
            // Mail Sending code here, install PHPmailer, something to do with Composer?
        } else {
            echo "Error inserting user: " . $conn->error;
        }
    } else {
        echo "No account request found with the given ID.";
    }
} else {
    echo "ID not provided.";
}

// Close the database connection
$conn->close();
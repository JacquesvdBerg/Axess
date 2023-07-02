<?php
session_start();

// Replace the placeholders with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "axess";

// Get the ID from the request
if (isset($_POST['email']) && isset($_POST['password'])) {
    // Both email and password are set
    $email = $_POST['email'];
    $userpassword = $_POST['password'];

    // Establish the database connection
    $connection = mysqli_connect($servername, $username, $password, $dbname);

    // Check if the connection was successful
    if (!$connection) {
        die('Database connection failed: ' . mysqli_connect_error());
    }

    $sql = "SELECT * FROM admins WHERE email = '$email' AND password = '$userpassword';";
    $result = mysqli_query($connection, $sql);

    if (mysqli_num_rows($result) == 1) {
        $responseText = "success";
        $_SESSION['email'] = $email;
    } else {
        $responseText = "No such email or password";
    }

    // Close the database connection
    mysqli_close($connection);

    echo $responseText;
} else {
    // Email or password is missing
    echo "Email and/or password is missing";
}
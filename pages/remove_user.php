<?php
// Establish a database connection
$servername = "34.66.229.30";
$username = "root";
$password = "iYud{Qas09es5e8p";
$dbname = "axess";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the ID from the request
if (isset($_POST['id'])) {
    $id = (int)$_POST['id'];
    // Delete the row from users table
    $deleteSql = "DELETE FROM users WHERE userID = $id";
    $conn->query($deleteSql);
} else {
    echo "ID not provided.";
}

// Close the database connection
$conn->close();

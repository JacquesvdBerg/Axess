<?php
// Replace the placeholders with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "axess";

// Establish the database connection
$connection = mysqli_connect($servername, $username, $password, $dbname);

// Check if the connection was successful
if (!$connection) {
    die('Database connection failed: ' . mysqli_connect_error());
}

$sql = "SELECT * FROM `users`;";
$result = mysqli_query($connection, $sql);

$rows = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
}

// Close the database connection
mysqli_close($connection);

// Encode the rows as JSON
$responseText = json_encode($rows);

echo $responseText;
?>
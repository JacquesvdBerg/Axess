<?php
// Start the session (if not already started)
session_start();

// Clear all session variables
session_unset();

// Destroy the session and remove all session data
session_destroy();

// Redirect to the login page or any desired page
header("Location: index.html");
exit();
?>
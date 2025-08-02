<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE); // convert JSON into array

    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if ($email && $password) {
        // Check if the email and password match in the database
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND password = ?");
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            echo json_encode(["Success" => "Login successful"]);
        } else {
            echo json_encode(["Error" => "Invalid email or password"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Invalid input"]);
    }

    $conn->close();
}

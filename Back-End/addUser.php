<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Connection failed: ' . $conn->connect_error
    ]);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Only POST method is allowed");
    }

    $userName = $_POST['user_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? '';

    if (empty($userName) || empty($email) || empty($password) || empty($role)) {
        throw new Exception("All fields are required: user_name, email, password, role");
    }

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'User already exists'
        ]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO users (Name, password, email, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $userName, $password, $email, $role);
    if (!$stmt->execute()) {
        throw new Exception("Database error: " . $stmt->error);
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'User added successfully',
        'user_id' => $stmt->insert_id,
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
    ]);
}

$conn->close();

<?php
// رؤوس CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// عرض الأخطاء (للتطوير فقط)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}



// الاتصال بقاعدة البيانات
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit;
}

try {
    // التأكد من أن الطلب POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Only POST requests are allowed");
    }

    // استلام البيانات بصيغة JSON
    $input = json_decode(file_get_contents("php://input"), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    // التحقق من الحقول
    if (empty($email) || empty($password)) {
        throw new Exception("Email and password are required");
    }

    // البحث عن المستخدم
    $stmt = $conn->prepare("SELECT id, Name, email, password, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // التحقق من وجود المستخدم
    if ($result->num_rows === 0) {
        http_response_code(401); // Unauthorized
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid email or password'
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    // التحقق من كلمة المرور (بسيطة هنا بدون تشفير)
    if ($user['password'] !== $password) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid email or password'
        ]);
        exit;
    }

    // تسجيل دخول ناجح
    echo json_encode([
        'status' => 'success',
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'name' => $user['Name'],
            'email' => $user['email'],
            'role' => $user['role'],
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?>

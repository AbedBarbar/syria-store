<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// تفعيل عرض الأخطاء
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// اتصال قاعدة البيانات
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        'status' => 'error',
        'message' => 'Connection failed: ' . $conn->connect_error
    ]));
}



try {
    // التحقق من طريقة الطلب
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Only POST method is allowed");
    }

    // استقبال البيانات
    $userId = $_POST['id'] ?? null;
    $userName = $_POST['user_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? '';
    
    // التحقق من أن ID المنتج مُرسل
    if (empty($userId)) {
        throw new Exception("User ID is required for update.");
    }

    // التحقق من الحقول المطلوبة
    if (empty($userName) || empty($email) || empty($password) || empty($role)) {
        throw new Exception("All fields are required: user_name, email, password, role.");
    }

   

    // إعداد استعلام التحديث
    $sql = "UPDATE users SET Name = ?, email = ?, password = ?, role = ?";
    $params = ["ssss", $userName, $email, $password, $role];

    

    $sql .= " WHERE id = ?";
    $params[0] .= "i";
    $params[] = $userId;

    // تنفيذ التحديث
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(...$params);

    if (!$stmt->execute()) {
        throw new Exception("Database error: " . $stmt->error);
    }

    // الاستجابة الناجحة
    echo json_encode([
        'status' => 'success',
        'message' => 'User updated successfully',
        'user_id' => $userId,
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

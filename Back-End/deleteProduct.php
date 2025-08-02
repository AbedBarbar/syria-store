<?php
// 🟢 ترويسات CORS - ضرورية لتجنب الخطأ
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// 🟡 الرد على طلب preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ قراءة البيانات JSON من body
$data = json_decode(file_get_contents("php://input"));

// 🛑 تحقق من وجود id
if (!isset($data->id)) {
    http_response_code(400);
    echo json_encode(["error" => "Product ID is required."]);
    exit();
}

// 🛠️ الاتصال بقاعدة البيانات
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);

// 🛡️ تأمين id
$id = intval($data->id);

// ❌ خطأ اتصال
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// ✅ حذف المنتج
$sql = "DELETE FROM products WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(["message" => "Product deleted successfully."]);
} else {
    http_response_code(404);
    echo json_encode(["error" => "Product not found."]);
}

$stmt->close();
$conn->close();
?>

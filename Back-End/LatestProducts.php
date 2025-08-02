<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// عرض الأخطاء
ini_set('display_errors', 1);
error_reporting(E_ALL);

// الاتصال بقاعدة البيانات
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "project";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

try {
    // تأكد أن جدول المنتجات يحتوي على عمود اسمه `type`
    $sql = "SELECT id, name, price, type FROM products ORDER BY id DESC LIMIT 5";
    $result = $conn->query($sql);

    $products = [];

    while ($row = $result->fetch_assoc()) {
        $products[] = [
            "id" => $row["id"],
            "name" => $row["name"],
            "price" => $row["price"],
            "Type" => $row["type"] // ملاحظة: بحرف كبير كما هو مستخدم في React
        ];
    }

    echo json_encode([
        "status" => "success",
        "products" => $products
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Query failed: " . $e->getMessage()
    ]);
}

$conn->close();
?>
